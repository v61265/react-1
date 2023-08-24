import React, { useState, useEffect } from 'react' // eslint-disable-line
import Video from './components/demo-video.js'
import Scroll from './components/demo-scroll.js'
import useWindowDimensions from './hooks/use-window-dimensions.js'
import { v4 as uuidv4 } from 'uuid'

/**
 *  @typedef {Object} Theatre
 *  @property {Array | null} objectJson
 *  @property {Object | null} animateJson
 *  @property {Array | null} [mobileObjectJson]
 *  @property {Object | null} [mobileAnimateJson]
 *  @property {number} [mobileSize]
 *  @property {'scroll' | 'video'} [type]
 */
/**
 *  @param {Theatre} props
 */
export default function Theatre({
  objectJson = [],
  animateJson = {},
  mobileObjectJson = [],
  mobileAnimateJson = {},
  mobileSize = 768,
  type = 'scroll',
}) {
  /**
   * If `objectJson` or `animateJson` is null,
   * the component will return `null`, displaying no content.
   */
  if (objectJson === null || animateJson === null) {
    console.log(
      'NOTICE: Theatre received invalid data format. objectJson should be an array, and animateJson should be an object.'
    )
    return null
  }

  if (
    !Array.isArray(objectJson) ||
    !Array.isArray(mobileObjectJson) ||
    typeof animateJson !== 'object' ||
    typeof mobileAnimateJson !== 'object'
  ) {
    throw new Error(
      'Theatre received invalid data format. objectJson should be an array, and animateJson should be an object.'
    )
  }

  // ------------------------------

  const { width } = useWindowDimensions()
  const isMobile = width < mobileSize

  const mobileObjData =
    mobileObjectJson && mobileObjectJson.length ? mobileObjectJson : objectJson

  const mobileAniData =
    mobileAnimateJson && Object.keys(mobileAnimateJson).length
      ? mobileAnimateJson
      : animateJson

  const [object_Json, setObjectJson] = useState(mobileObjData)
  const [animate_Json, setAnimateJson] = useState(mobileAniData)

  useEffect(() => {
    setObjectJson(isMobile ? mobileObjData : objectJson)
    setAnimateJson(isMobile ? mobileAniData : animateJson)
  }, [isMobile, mobileObjectJson, objectJson, mobileAnimateJson, animateJson])

  // ------------------------------

  /**
   * Since projectName in Theatre.getProject(projectName) must have between 3 and 32 characters.
   * Here only take the first 10 characters.
   * And when the content is less than 3 characters, add 0 to it.
   *
   * When the config is changed, the project ID must also be different.
   * Therefore, when the screen width changes, use UUID to generate a new project ID name randomly.
   */
  const [PROJECT_ID, setProjectId] = useState(() =>
    uuidv4()
      .slice(0, 10)
      .padEnd(3, '0')
  )

  useEffect(() => {
    setProjectId(
      uuidv4()
        .slice(0, 10)
        .padEnd(3, '0')
    )
  }, [isMobile])

  // ------------------------------

  let component = null

  switch (type) {
    case 'scroll':
      component = (
        <Scroll
          objectJson={object_Json}
          animateJson={animate_Json}
          projectId={PROJECT_ID}
        />
      )
      break
    case 'video':
      component = (
        <Video
          objectJson={object_Json}
          animateJson={animate_Json}
          projectId={PROJECT_ID}
        />
      )
      break
    default:
      component = (
        <Scroll
          objectJson={object_Json}
          animateJson={animate_Json}
          projectId={PROJECT_ID}
        />
      )
      break
  }
  return <>{component}</>
}
