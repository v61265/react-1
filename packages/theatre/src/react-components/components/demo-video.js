import { useEffect, useState } from 'react' // eslint-disable-line
import { getProject } from '@theatre/core'
import { renderFontObject, renderImageObject } from '../utils/index.js'
import Stage from './stage.js'
import { v4 as uuidv4 } from 'uuid'

export default function DemoVideo({ animateJson = {}, objectJson = [] }) {
  /**
   * Since projectName in Theatre.getProject(projectName) must have between 3 and 32 characters.
   * Here only take the first 10 characters
   * And when the content is less than 3 characters, add 0 to it.
   */
  const [PROJECT_ID] = useState(() =>
    uuidv4()
      .slice(0, 10)
      .padEnd(3, '0')
  )

  const project = getProject(`${PROJECT_ID}`, { state: animateJson })
  const sheet = project.sheet('Scene', 'default')

  project.ready.then(() =>
    sheet.sequence.play({
      iterationCount: Infinity,
    })
  )

  useEffect(() => {
    if (objectJson.length > 0) {
      renderFontObject(objectJson, sheet)
      renderImageObject(objectJson, sheet)
    }
  }, [objectJson])

  return <Stage objectJson={objectJson} />
}
