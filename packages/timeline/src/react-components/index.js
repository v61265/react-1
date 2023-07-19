import styled, { createGlobalStyle } from 'styled-components'
import TimelineUnit from './timeline-unit'
import {
  calcNextLevelIndex,
  generateTimeLevel,
  generateTimelineData,
  getMeasureFromLevel,
  getSortedTimelineFromLiveblog,
} from '../utils/timeline'
import TimelineControl from './timeline-control'
import { useEffect, useMemo, useRef, useState } from 'react'
import TimelineEventPanel from './timeline-event-panel'
import TimelineEventList from './timeline-event-list'

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

  figure {
    margin: 0;
  }
`

const Wrapper = styled.div`
  position: relative;
  width: 320px;
  margin: 0 auto;
`

function getBubbleLevel(max, count) {
  const levelSize = max / 5
  return Math.ceil(count / levelSize)
}

export default function Timeline({
  liveblog,
  fetchImageBaseUrl = 'https://editools-gcs-dev.readr.tw',
}) {
  const timeline = useMemo(() => getSortedTimelineFromLiveblog(liveblog), [
    liveblog,
  ])
  const [filterTags] = useState([])
  const [stickyStrategy, setStickStrategy] = useState('absolute-top')
  const [focusIndex, setFocusIndex] = useState(0)

  const { timeEvents, timeKeys, timeMax } = useMemo(
    () => generateTimelineData(timeline, filterTags),
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

  const isLevelChangedRef = useRef(false)
  /** @type {React.RefObject<HTMLDivElement>} */
  const topRef = useRef(null)
  /** @type {React.RefObject<HTMLDivElement>} */
  const bottomRef = useRef(null)

  const updateLevel = (newLevel, spFocusIndex) => {
    const oldFocusIndex = spFocusIndex || focusIndex
    const newFocusIndex = calcNextLevelIndex(
      timeUnitKeys[oldFocusIndex],
      timeKeys[getMeasureFromLevel(newLevel)],
      level - newLevel > 0
    )
    isLevelChangedRef.current = true
    setFocusIndex(newFocusIndex)
    setLevel(newLevel)
  }

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
      setFocusIndex(index)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [timeUnitKeys])

  useEffect(() => {
    if (containerRef.current && isLevelChangedRef.current) {
      const focusTimeUnitKey = timeUnitKeys[focusIndex]
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
  }, [level, timeUnitKeys, focusIndex])

  useEffect(() => {
    if (topRef.current && bottomRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ boundingClientRect }) => {
          if (!boundingClientRect.width || !containerRef.current) {
            return
          }

          const bounding = containerRef.current.getBoundingClientRect()

          if (bounding.height) {
            if (bounding.y > 0) {
              setStickStrategy('absolute-top')
            } else if (bounding.y + bounding.height > window.innerHeight) {
              setStickStrategy('fixed')
            } else {
              setStickStrategy('absolute-bottom')
            }
          }
        })
      })

      observer.observe(topRef.current)
      observer.observe(bottomRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  const focusEvent =
    timeUnitEvents[timeUnitKeys[focusIndex]]?.length === 1
      ? timeUnitEvents[timeUnitKeys[focusIndex]][0]
      : null

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
              updateLevel(level - 1, index)
            }}
            containerRef={containerRef}
            onSingleTimelineNodeSelect={() => {
              setFocusIndex(index)
            }}
          />
        )
      })
    ) : (
      <TimelineEventList
        events={timeUnitEvents}
        fetchImageBaseUrl={fetchImageBaseUrl}
      />
    )

  return (
    <Wrapper ref={containerRef}>
      <div id="top" ref={topRef} />
      <GlobalStyles />
      {timelineJsx}
      <TimelineControl
        maxLevel={maxLevel}
        level={level}
        updateLevel={updateLevel}
        stickyStrategy={stickyStrategy}
      />
      {measure !== 'event' && (
        <TimelineEventPanel
          event={focusEvent}
          fetchImageBaseUrl={fetchImageBaseUrl}
          stickyStrategy={stickyStrategy}
        />
      )}
      <div id="bottom" ref={bottomRef} />
    </Wrapper>
  )
}
