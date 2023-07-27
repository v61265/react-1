import { val, getProject } from '@theatre/core'
import { useState, useEffect, useRef } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import Stage from './stage.js'

const ViewBox = styled.div`
  position: relative;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  background: #ffffff;
`

const StageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`

const defaultScrollScale = 1500

/**
 *  @param {Object} props
 *  @param {Object} props.animateJson
 *  @param {Array} props.objectJson
 *  @param {string} props.projectId
 */
export default function DemoScroll({
  animateJson = {},
  objectJson = [],
  projectId = '',
}) {
  const projectState =
    Object.keys(animateJson).length > 0 ? { state: animateJson } : {}

  const project = getProject(`${projectId}`, projectState)
  const sheet = project.sheet('Scene', 'default')
  project.ready.then(() => sheet.sequence.pause())

  // --------------------------
  // TODO: 增加條件，減少 event-listener 偵測時間

  const [scrollPosition, setScrollPosition] = useState(0)

  const sequenceLength = val(sheet.sequence.pointer.length)
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

  return (
    <ViewBox
      className="theatre-scroll-viewbox"
      style={{ height: `${sequenceLength * defaultScrollScale}px` }}
    >
      <StageWrapper ref={stageRef}>
        <Stage objectJson={objectJson} sheet={sheet} />
      </StageWrapper>
    </ViewBox>
  )
}
