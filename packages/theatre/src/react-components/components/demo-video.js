import { getProject } from '@theatre/core'
import Stage from './stage.js'

/**
 *  @param {Object} props
 *  @param {Object} props.animateJson
 *  @param {Array} props.objectJson
 *  @param {string} props.projectId
 */
export default function DemoVideo({
  animateJson = {},
  objectJson = [],
  projectId = '',
}) {
  const projectState =
    Object.keys(animateJson).length > 0 ? { state: animateJson } : {}
  const project = getProject(`${projectId}`, projectState)

  const sheet = project.sheet('Scene', 'default')
  project.ready.then(() => sheet.sequence.play())

  return <Stage objectJson={objectJson} sheet={sheet} />
}
