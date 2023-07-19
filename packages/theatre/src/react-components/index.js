import React from 'react' // eslint-disable-line
import Video from './components/demo-video.js'
import Scroll from './components/demo-scroll.js'

/**
 *  @typedef {Object} Theatre
 *  @property {Array} objectJson
 *  @property {Object} animateJson
 *  @property {'scroll' | 'video'} [type]
 */
/**
 *  @param {Theatre} props
 */
export default function Theatre({
  objectJson = [],
  animateJson = {},
  type = 'scroll',
}) {
  let component = null

  switch (type) {
    case 'scroll':
      component = <Scroll objectJson={objectJson} animateJson={animateJson} />
      break
    case 'video':
      component = <Video objectJson={objectJson} animateJson={animateJson} />
      break
    default:
      component = <Scroll objectJson={objectJson} animateJson={animateJson} />
      break
  }

  return <>{component}</>
}
