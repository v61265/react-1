import { val, getProject } from '@theatre/core'
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

export default function DemoScroll({ state = {}, elements = [] }) {
  const project = getProject('Project', { state })
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
    if (elements.length > 0) {
      renderFontObject(elements, sheet)
      renderImageObject(elements, sheet)
    }
  }, [elements])

  return (
    <ViewBox
      className="theatre-scroll-viewbox"
      style={{ height: `${sequenceLength * defaultScrollScale}px` }}
    >
      <StageWrapper ref={stageRef}>
        <Stage elements={elements} />
      </StageWrapper>
    </ViewBox>
  )
}
