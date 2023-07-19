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
import TimelineEvent from './timeline-event'

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

const TimelineWrapper = styled.div`
  ${({ eventMode }) => eventMode && `padding: 0 36px 12px;`}
`

const EventWrapper = styled.div`
  margin-top: 12px;
  border: 2px solid #000;
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
    const onScroll = () => {
      /** @type {HTMLDivElement} */
      const containerDiv = containerRef.current
      const containerTop = containerDiv.getBoundingClientRect().top

      function getIndexOfTheTopMostItemV2(top, parentDom) {
        if (top >= 0) {
          return 0
        } else {
          let topSum = top
          for (let i = 0; i < parentDom.children.length; i++) {
            let node = parentDom.children[i]
            topSum += node.getBoundingClientRect().height
            if (topSum >= 0) {
              return i
            }
            if (i === parentDom.children.length - 1) {
              return parentDom.children.length - 1
            }
          }
        }
      }
      const index = getIndexOfTheTopMostItemV2(containerTop, containerDiv)
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
    measure !== 'event'
      ? timeUnitKeys.map((timeUnitKey, index) => {
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
              onSingleTimelineNodeSelect={() => {
                setFocusIndex(index)
              }}
            />
          )
        })
      : timeUnitKeys.map((timeUnitKey) => {
          const event = timeUnitEvents[timeUnitKey]
          return (
            <EventWrapper key={timeUnitKey} id={`node-${timeUnitKey}`}>
              <TimelineEvent
                event={event}
                fetchImageBaseUrl={fetchImageBaseUrl}
              />
            </EventWrapper>
          )
        })

  return (
    <Wrapper>
      <div id="top" ref={topRef} />
      <GlobalStyles />
      <TimelineWrapper ref={containerRef} eventMode={measure === 'event'}>
        {timelineJsx}
      </TimelineWrapper>
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
