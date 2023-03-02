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
  top: 40%;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: black;
  }

  &::after {
    content: '‹';
    display: block;
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    top: -5px;
    left: -2px;
    position: relative;
    line-height: 1;
  }
`
const PrevNav = styled(Nav)`
  left: 0;
`

const NextNav = styled(Nav)`
  right: 0;
  &::after {
    transform: rotate(180deg);
    transform-origin: center 57%;
    left: 2px;
  }
`

const Caption = styled.div``

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

  const width = window.innerWidth
  const height = window.innerHeight

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
 *  @property {Vector3} position - array to present (x, y, z)
 *  @property {Quaternion} quaternion - array to present (x, y, z, w)
 *  @property {number} duration
 *  @property {string} ease
 */

/**
 *  @param {Object} props
 *  @param {Object} props.model
 *  @param {string} props.model.url
 *  @param {'glb'|'tileset'} [props.model.fileFormat='glb']
 *  @param {string[]} [props.captions=[]]
 *  @param {PlainPOI[]} [props.pois=[]]
 */
export default function ThreeStoryPoints({
  model: modelObj,
  // captions=[],
  pois: plainPois = [],
}) {
  const { url: modelUrl, fileFormat = 'glb' } = modelObj || {}
  const [model, setModel] = useState(null)
  // const [ poiIndex, setPoiIndex ] = useState(0)

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

  useEffect(() => {
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
  }, [modelUrl, fileFormat])

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

  useEffect(() => {
    const updateThreeObj = _.throttle(function() {
      const { camera, renderer } = threeObj
      const width = window.innerWidth
      const height = window.innerHeight

      // Update camera
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    window.addEventListener('resize', updateThreeObj)

    return () => {
      window.removeEventListener('resize', updateThreeObj)
    }
  }, [threeObj])

  return (
    <Block>
      <canvas ref={canvasRef}></canvas>
      <PrevNav onClick={() => threeObj?.controls?.prevPOI()}>Previous</PrevNav>
      <NextNav onClick={() => threeObj?.controls.nextPOI()}>Next</NextNav>
      <Caption></Caption>
      <div></div>
    </Block>
  )
}
