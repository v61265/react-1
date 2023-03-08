import styled from 'styled-components'
import throttle from 'lodash/throttle.js'
import { CameraRig, StoryPointsControls } from 'three-story-controls'
import {
  PerspectiveCamera,
  Vector3,
  Quaternion,
  Scene,
  WebGLRenderer,
  PCFSoftShadowMap,
  HemisphereLight,
} from 'three'
import { loadGltfModel } from '../loader.js'
import { useState, useEffect, useRef, useMemo } from 'react'
import breakpoint from '../breakpoint.js'

const _ = {
  throttle,
}

const Block = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  touch-action: none;
`

const Nav = styled.div`
  position: absolute;
  top: 50%;
  background-color: #ea5f5f;
  cursor: pointer;
  width: 60px;
  height: 60px;
  transform: translateY(-50%);
  text-align: center;

  &::after {
    content: '>';
    color: #000;
    font-size: 48px;
    font-weight: 900;
  }
`
const PrevNav = styled(Nav)`
  left: 0;
  &::after {
    content: '<';
  }
`

const NextNav = styled(Nav)`
  right: 0;
`

const Caption = styled.div`
  position: absolute;
  background-color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  text-align: justify;
  color: #4b4b4b;
  bottom: 0;
  padding: 16px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 63px;
    height: 63px;
    border-left: 9px #ea5f5f solid;
    border-top: 9px #ea5f5f solid;
  }

  @media ${breakpoint.devices.tablet} {
    left: 8px;
    bottom: 65px;
    width: 549px;
    padding: 19px 24px 18px 21px;
    border-radius: 0px 20px 20px 20px;

    &::before {
      top: -9px;
      left: -9px;
    }
  }
`

/**
 *  @param {Object} model
 *  @param {POI[]} pois
 *  @param {React.RefObject} canvasRef
 *  @returns {{controls: StoryPointsControls, camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer}}
 */
function createThreeObj(model, pois, canvasRef) {
  if (model === null) {
    return null
  }

  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight

  /**
   *  Scene
   */
  const scene = new Scene()
  scene.add(model.scene)

  /**
   *  Lights
   */
  const light = new HemisphereLight(0xffffbb, 0x080820, 1)
  scene.add(light)

  /**
   *  Camera
   */
  const camera = new PerspectiveCamera(75, width / height, 0.1, 100)
  camera.position.set(2, 2, 2)

  /**
   *  Controls
   */
  // Initialize StoryPointControls with poi data
  const rig = new CameraRig(camera, scene)
  const controls = new StoryPointsControls(rig, pois)
  controls.enable()
  controls.goToPOI(0)

  //
  /**
   * Renderer
   */
  const renderer = new WebGLRenderer({
    canvas: canvasRef?.current,
  })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  return {
    scene,
    controls,
    renderer,
    camera,
  }
}

/**
 *  @typedef {Object} PlainPOI - Point of Interest in plain object data structure
 *  @property {number[]} position - array to present (x, y, z)
 *  @property {number[]} quaternion - array to present (x, y, z, w)
 *  @property {number} duration
 *  @property {string} ease
 */

/**
 *  @typedef {Object} POI - Point of Interest in ThreeJS data structure
 *  @property {Vector3} position
 *  @property {Quaternion} quaternion
 *  @property {number} duration
 *  @property {string} ease
 */

/**
 *  @typedef {Object} ModelProp
 *  @property {string} url
 *  @property {'glb'} [fileFormat='glb']
 */

/**
 *  @param {Object} props
 *  @param {ModelProp} props.model
 *  @param {ModelProp} [props.desktopModel={}]
 *  @param {string[]} [props.captions=[]]
 *  @param {PlainPOI[]} [props.pois=[]]
 */
export default function ThreeStoryPoints({
  model: mobileModel,
  desktopModel,
  captions = [],
  pois: plainPois = [],
}) {
  const [model, setModel] = useState(null)
  const [poiIndex, setPoiIndex] = useState(0)

  /** @type POI[] */
  const pois = useMemo(() => {
    // Create POIs with data exported from the CameraHelper tool
    // (see here for more: https://nytimes.github.io/three-story-controls/#camera-helper)
    // Note: Any method of listing camera position and quaternion will work for StoryPointControls
    return plainPois?.map((poi) => {
      return {
        position: new Vector3(...poi.position),
        quaternion: new Quaternion(...poi.quaternion),
        duration: poi.duration,
        ease: poi.ease,
      }
    })
  }, [plainPois])

  const canvasRef = useRef(null)
  const threeObj = useMemo(() => createThreeObj(model, pois, canvasRef), [
    model,
    pois,
    canvasRef,
  ])

  // Load 3D model
  useEffect(() => {
    let modelUrl = mobileModel?.url
    let fileFormat = mobileModel.fileFormat || 'glb'
    if (window.innerWidth >= breakpoint.sizes.tablet) {
      modelUrl = desktopModel?.url || modelUrl
      fileFormat = desktopModel?.fileFormat || fileFormat
    }
    if (modelUrl && fileFormat) {
      switch (fileFormat) {
        case 'glb':
        default: {
          loadGltfModel(modelUrl).then((model) => {
            setModel(model)
          })
        }
      }
    }
  }, [mobileModel, desktopModel])

  // Handle 3D model animation
  useEffect(() => {
    let requestId
    const tick = () => {
      if (threeObj !== null) {
        const { scene, controls, camera, renderer } = threeObj

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        requestId = window.requestAnimationFrame(tick)
      }
    }
    requestId = tick()

    // Clean up
    return () => {
      cancelAnimationFrame(requestId)
    }
  }, [threeObj])

  // Handle resize event
  useEffect(() => {
    const updateThreeObj = _.throttle(function() {
      const { camera, renderer } = threeObj
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight

      // Update camera
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    window.addEventListener('resize', updateThreeObj)

    // Clean up
    return () => {
      window.removeEventListener('resize', updateThreeObj)
    }
  }, [threeObj])

  // Handle `StoryPointsControls` `update` event
  useEffect(() => {
    if (threeObj !== null) {
      const updateHandler = (e) => {
        // Percentage of transition completed, between 0 and 1
        if (e.progress === 0) {
          // Go to the next poi
          setPoiIndex(e.upcomingIndex)
        }
      }
      threeObj.controls.addEventListener('update', updateHandler)

      // Clean up
      return () => {
        threeObj.controls.removeEventListener('update', updateHandler)
      }
    }
  }, [threeObj])

  return (
    <Block>
      <canvas ref={canvasRef}></canvas>
      {poiIndex > 0 ? (
        <PrevNav
          onClick={() => {
            threeObj.controls.prevPOI()
          }}
        />
      ) : null}
      {poiIndex < pois.length - 1 ? (
        <NextNav
          onClick={() => {
            threeObj.controls.nextPOI()
          }}
        />
      ) : null}
      <Caption>{captions[poiIndex]}</Caption>
      <div></div>
    </Block>
  )
}
