import { val, getProject } from '@theatre/core'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect, useRef } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import Stage from '../components/stage.js'
import { renderFontObject, renderImageObject } from '../utils/index.js'

const ViewBox = styled.div`
  position: relative;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  background: #ffffff;
  z-index: 1000;
`

const StageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`

const defaultScrollScale = 1500

export default function DemoScroll({ animateJson = {}, objectJson = [] }) {
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
  project.ready.then(() => sheet.sequence.pause())

  // --------------------------
  // TODO: 增加條件，減少 event-listener 偵測時間

  const [scrollPosition, setScrollPosition] = useState(0)

  const sequenceLength = val(sheet.sequence.pointer.length) //總長度
  const stageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const stage = stageRef.current
      const viewbox = stage.closest('.theatre-scroll-viewbox')

      const stageRect = stage.getBoundingClientRect()
      const viewboxRect = viewbox.getBoundingClientRect()

      const distance = stageRect.top - viewboxRect.top
      setScrollPosition(distance)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const newPosition =
      (scrollPosition / (sequenceLength * defaultScrollScale)) * sequenceLength
    sheet.sequence.position = newPosition
  }, [scrollPosition])

  // ------------------------------

  useEffect(() => {
    if (objectJson.length > 0) {
      renderFontObject(objectJson, sheet)
      renderImageObject(objectJson, sheet)
    }
  }, [objectJson])

  return (
    <ViewBox
      className="theatre-scroll-viewbox"
      style={{ height: `${sequenceLength * defaultScrollScale}px` }}
    >
      <StageWrapper ref={stageRef}>
        <Stage objectJson={objectJson} />
      </StageWrapper>
    </ViewBox>
  )
}
