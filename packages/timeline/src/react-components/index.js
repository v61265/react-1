import styled, { createGlobalStyle } from 'styled-components'
import TimelineUnit from './timeline-unit'
import {
  calcNextLevelIndex,
  generateTimeLevel,
  generateTimelineData,
  getMeasureFromLevel,
  transformLiveblogToTimeline,
} from '../utils/timeline'
import TimelineControl from './timeline-control'
import { useEffect, useMemo, useRef, useState } from 'react'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize line-height'. Cannot be changed from 'normal' in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable 'input' types in iOS */
    -webkit-appearance: none;
  }
`

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
`

function getBubbleLevel(max, count) {
  const levelSize = max / 5
  return Math.ceil(count / levelSize)
}

export default function Timeline({ liveblog }) {
  const timeline = useMemo(() => transformLiveblogToTimeline(liveblog), [
    liveblog,
  ])
  const { timeEvents, timeKeys, timeMax } = useMemo(
    () => generateTimelineData(timeline),
    [timeline]
  )
  const { initialLevel, maxLevel } = useMemo(
    () => generateTimeLevel(timeline),
    [timeline]
  )
  const [level, setLevel] = useState(initialLevel)
  const measure = getMeasureFromLevel(level)
  const timeUnitEvents = timeEvents[measure]
  const timeUnitKeys = timeKeys[measure]
  const timeUnitMax = timeMax[measure]
  /** @type {React.RefObject<HTMLDivElement>} */
  const containerRef = useRef(null)
  const focusIndexRef = useRef(0)
  const isLevelChangedRef = useRef(false)

  const updateLevel = (newLevel) => {
    const newFocusIndex = calcNextLevelIndex(
      timeUnitKeys[focusIndexRef.current],
      timeKeys[getMeasureFromLevel(newLevel)],
      level - newLevel > 0
    )
    focusIndexRef.current = newFocusIndex
    isLevelChangedRef.current = true
    setLevel(newLevel)
  }

  let timelineJsx =
    measure !== 'event' ? (
      timeUnitKeys.map((timeUnitKey, index) => {
        const events = timeUnitEvents[timeUnitKey]
        return (
          <TimelineUnit
            eventsCount={events.length}
            bubbleSizeLevel={getBubbleLevel(timeUnitMax, events.length)}
            date={timeUnitKey}
            key={timeUnitKey}
            onBubbleClick={() => {
              focusIndexRef.current = index
              updateLevel(level - 1)
            }}
            containerRef={containerRef}
          />
        )
      })
    ) : (
      <div style={{ height: '100vh' }}>Liveblog</div>
    )

  useEffect(() => {
    const timelineLength = timeUnitKeys?.length
    const onScroll = () => {
      /** @type {HTMLDivElement} */
      const containerDiv = containerRef.current
      const containerTop = containerDiv.getBoundingClientRect().top
      const cellHeight = 140
      function getIndexOfTheTopMostItem(top, itemHeight) {
        if (top >= 0) {
          return 0
        } else if (top + timelineLength * itemHeight < 0) {
          // timeline fully below the viewport
          return timelineLength - 1
        } else {
          let index = 0
          while (top + (index + 1) * itemHeight < 0) {
            index++
          }
          return index
        }
      }
      const index = getIndexOfTheTopMostItem(containerTop, cellHeight)
      focusIndexRef.current = index
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [timeUnitKeys])

  useEffect(() => {
    if (containerRef.current && isLevelChangedRef.current) {
      const focusTimeUnitKey = timeUnitKeys[focusIndexRef.current]
      const focusTimelineUnitEle = containerRef.current.querySelector(
        `#node-${focusTimeUnitKey}`
      )
      if (focusTimelineUnitEle) {
        // add 1 px to prevent focusIndex count on scroll mistaken
        window.scrollTo(
          0,
          window.scrollY + focusTimelineUnitEle.getBoundingClientRect().top + 1
        )
      }
      isLevelChangedRef.current = false
    }
  }, [level, timeUnitKeys])

  return (
    <Wrapper ref={containerRef}>
      <GlobalStyles />
      {timelineJsx}
      <TimelineControl
        maxLevel={maxLevel}
        level={level}
        updateLevel={updateLevel}
      />
    </Wrapper>
  )
}
