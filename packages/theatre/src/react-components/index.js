import React from 'react' // eslint-disable-line
import Video from './components/demo-video.js'
import Scroll from './components/demo-scroll.js'

/**
 *  @typedef {Object} VisualAnimation
 *  @property {Array} elements
 *  @property {Object} state
 *  @property {'scroll' | 'video'} type
 */
/**
 *  @param {VisualAnimation} props
 */
export default function Theatre({
  state = {},
  elements = [],
  type = 'scroll',
}) {
  let component = null

  switch (type) {
    case 'scroll':
      component = <Scroll elements={elements} state={state} />
      break
    case 'video':
      component = <Video elements={elements} state={state} />
      break
    default:
      component = <Scroll elements={elements} state={state} />
      break
  }

  return <>{component}</>
}
