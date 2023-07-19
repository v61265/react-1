import { useEffect } from 'react' // eslint-disable-line
import { getProject } from '@theatre/core'
import { renderFontObject, renderImageObject } from '../utils/index.js'
import Stage from './stage.js'

export default function DemoVideo({ state = {}, elements = [] }) {
  const project = getProject('Project', { state })
  const sheet = project.sheet('Scene', 'default')

  project.ready.then(() =>
    sheet.sequence.play({
      iterationCount: Infinity,
    })
  )

  useEffect(() => {
    if (elements.length > 0) {
      renderFontObject(elements, sheet)
      renderImageObject(elements, sheet)
    }
  }, [elements])

  return <Stage elements={elements} />
}
