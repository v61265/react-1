import styled, { createGlobalStyle } from 'styled-components'
import {
  calcNextLevelUnitKey,
  generateTimeLevel,
  generateTimelineData,
  getMeasureFromLevel,
  getSortedTimelineFromLiveblog,
} from '../utils/timeline'
import TimelineControl from './timeline-control'
import { useEffect, useMemo, useRef, useState } from 'react'
import TimelineEventPanel from './timeline-event-panel'
import TimelineEvent from './timeline-event'
import { TagsContext, initialTags } from './useTags'
import { defaultConifg } from '../const/config'
import { useTimelineConfig } from './hook/useTimelineConfig'
import TimelineList from './timeline-list'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: Noto Sans CJK TC;
    -webkit-tap-highlight-color: transparent;

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
  background-color: #efefef;
  overflow: hidden;
  width: 100vw;
  position: relative;
  left: calc(50% - 50vw);
`

const TimelineWrapper = styled.div`
  position: relative;
  width: 320px;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: unset;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
`

const TimelineNodesWrapper = styled.div`
  ${({ eventMode }) => eventMode && `padding: 0 36px 12px;`}
`

const EventWrapper = styled.div`
  margin-top: 12px;
  border: 2px solid #000;

  @media (min-width: 768px) {
    width: 360px;
    margin: 12px auto 0;
  }
`

/**
 * @param {Object} props
 * @param {import('../utils/timeline').Liveblog} props.liveblog - liveblog containing timeline data
 * @param {string} props.fetchImageBaseUrl - base url for fetching image from CMS
 * @returns
 */
export default function Timeline({
  liveblog,
  fetchImageBaseUrl = 'https://editools-gcs-dev.readr.tw',
}) {
  const isTimeSortedAsc = liveblog.sort === 'asc' // default to 'desc'
  const timeline = useMemo(
    () => getSortedTimelineFromLiveblog(liveblog, isTimeSortedAsc),
    [liveblog, isTimeSortedAsc]
  )
  const [tags, setTags] = useState(initialTags)
  const [stickyStrategy, setStickStrategy] = useState('absolute-top')
  const [focusUnitKey, setFocusUnitKey] = useState('')

  const timelineConfig = timeline.config || defaultConifg
  const {
    headerHeight,
    dividers,
    bubbleLevelSizesInDivider,
    noEventContent,
  } = useTimelineConfig(timelineConfig)

  const {
    timeEvents,
    timeKeys,
    timeKeysToRender,
    timeMax,
    allTags,
  } = useMemo(
    () => generateTimelineData(timeline, tags, isTimeSortedAsc, dividers),
    [timeline, tags, isTimeSortedAsc]
  )
  const { initialLevel, maxLevel } = useMemo(
    () => generateTimeLevel(timeline),
    [timeline]
  )
  const [level, setLevel] = useState(initialLevel)
  const measure = getMeasureFromLevel(level)
  const timeUnitEvents = timeEvents[measure]
  const timeUnitKeys = timeKeys[measure]
  const firstTimeUnitKey = timeKeysToRender[0]
  const lastTimeeUnitKey = timeKeysToRender[timeKeysToRender.length - 1]
  const timeUnitKeysToRender = timeKeysToRender[measure]
  /** @type {React.RefObject<HTMLDivElement>} */
  const containerRef = useRef(null)

  const scroIntoViewType = useRef('')
  const blockOnScrollEvent = useRef(false)

  const updateLevel = (newLevel, spFocusUnitKey) => {
    const oldFocusUnitKey = spFocusUnitKey || focusUnitKey
    const newFocusUnitKey = calcNextLevelUnitKey(
      oldFocusUnitKey,
      timeKeys[getMeasureFromLevel(newLevel)],
      level - newLevel > 0,
      isTimeSortedAsc
    )
    scroIntoViewType.current = 'immediate'
    setFocusUnitKey(newFocusUnitKey)
    setLevel(newLevel)
  }

  useEffect(() => {
    const onScroll = () => {
      /** @type {HTMLDivElement} */
      const containerDiv = containerRef.current
      const containerTop = containerDiv.getBoundingClientRect().top
      if (blockOnScrollEvent.current) {
        return
      }
      function getIndexOfTheTopMostItem(top, parentDom) {
        if (top >= headerHeight) {
          return 0
        } else {
          let topSum = top
          for (let i = 0; i < parentDom.children.length; i++) {
            let node = parentDom.children[i]
            topSum += node.getBoundingClientRect().height
            if (topSum >= headerHeight) {
              return i
            }
            if (i === parentDom.children.length - 1) {
              return parentDom.children.length - 1
            }
          }
        }
      }
      const index = getIndexOfTheTopMostItem(containerTop, containerDiv)
      let focusNode = containerDiv.children[index]
      let newFocusUnitKey = focusNode.id.split('-')[1]
      setFocusUnitKey(newFocusUnitKey)

      // count sticky policy together with onscroll
      const bounding = containerRef.current.getBoundingClientRect()
      if (bounding.height < window.innerHeight) {
        setStickStrategy('absolute')
        return
      }
      if (bounding.height) {
        if (bounding.y >= headerHeight) {
          setStickStrategy('absolute-top')
        } else if (bounding.y + bounding.height > window.innerHeight) {
          setStickStrategy('fixed')
        } else {
          setStickStrategy('absolute-bottom')
        }
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [headerHeight])

  useEffect(() => {
    if (containerRef.current && scroIntoViewType.current) {
      const focusTimelineUnitEle = containerRef.current.querySelector(
        `#node-${focusUnitKey}`
      )
      function smoothScrollTo(targetPosition, speedFactor) {
        const startPosition = window.scrollY
        const distance = Math.abs(targetPosition - startPosition)
        const speed = speedFactor

        const duration = Math.min(2000, Math.max(300, distance / speed)) // Set a maximum and minimum duration to avoid extremely long or short scrolls
        const startTime = performance.now()

        function scrollStep(timestamp) {
          const currentTime = timestamp - startTime
          const scrollFraction = currentTime / duration

          if (currentTime >= duration) {
            window.scrollTo(0, targetPosition)
          } else {
            const easeValue = scrollFraction ** 2 // You can adjust the easing function here
            const scrollValue =
              startPosition +
              (targetPosition > startPosition ? 1 : -1) * distance * easeValue
            window.scrollTo(0, scrollValue)
            window.requestAnimationFrame(scrollStep)
            return
          }
          blockOnScrollEvent.current = false
        }

        window.requestAnimationFrame(scrollStep)
      }
      if (focusTimelineUnitEle) {
        // add 2 px to prevent focusIndex count on scroll mistaken
        if (scroIntoViewType.current === 'immediate') {
          blockOnScrollEvent.current = false
          window.scrollTo(
            0,
            window.scrollY +
              focusTimelineUnitEle.getBoundingClientRect().top +
              5 -
              headerHeight
          )
        } else if (scroIntoViewType.current === 'smooth') {
          blockOnScrollEvent.current = true
          // add 2 px to prevent focusIndex count on scroll mistaken
          smoothScrollTo(
            window.scrollY +
              focusTimelineUnitEle.getBoundingClientRect().top +
              5 -
              headerHeight,
            20
          )
        }
        scroIntoViewType.current = ''
      } else {
        // since focusKey can't map to a html node (may be filtered out)
        // scroll to the first node
        const newFocusUnitKey = timeUnitKeys[0]
        setFocusUnitKey(newFocusUnitKey)
        blockOnScrollEvent.current = true
      }
    }
  })

  const addTag = (newTag, timeUnitKey) => {
    if (window.screen.width < 768 && tags.length === 3) {
      // in mobile only support 3 tag filter
      return
    }
    if (!tags.includes(newTag)) {
      setTags((oldTags) => oldTags.concat(newTag))
      const newFocusUnitKey = timeUnitKey || focusUnitKey
      /*
       * since after filter there could be two condition:
       * 1. newFocusUnitKey still exist -> stay in the window
       * 2. newFocusUnitKey got filtered -> scroll to the first one
       */
      setFocusUnitKey(newFocusUnitKey)
      scroIntoViewType.current = 'immediate'
    }
  }

  const removeTag = (tagToBeRemoved) => {
    setTags((oldTags) => oldTags.filter((tag) => tag !== tagToBeRemoved))
    scroIntoViewType.current = 'immediate'
  }

  const focusEvent =
    timeUnitEvents[focusUnitKey]?.length === 1
      ? timeUnitEvents[focusUnitKey][0]
      : null

  let timelineNodesJsx =
    measure !== 'event' ? (
      <TimelineList
        timeUnitKeys={timeUnitKeysToRender}
        timeUnitEvents={timeUnitEvents}
        timeMax={timeMax}
        dividers={dividers}
        bubbleLevelSizesInDivider={bubbleLevelSizesInDivider}
        onBubbleClick={(timeUnitKey) => {
          updateLevel(level - 1, timeUnitKey)
        }}
        onSingleTimelineNodeSelect={(timeUnitKey) => {
          setFocusUnitKey(timeUnitKey)
        }}
        focusUnitKey={focusUnitKey}
        headerHeight={headerHeight}
        measure={measure}
        firstTimeUnitKey={firstTimeUnitKey}
        lastTimeeUnitKey={lastTimeeUnitKey}
      />
    ) : (
      timeUnitKeysToRender.map((timeUnitKey) => {
        const event = timeUnitEvents[timeUnitKey]
        return (
          <EventWrapper key={timeUnitKey} id={`node-${timeUnitKey}`}>
            <TimelineEvent
              event={event}
              fetchImageBaseUrl={fetchImageBaseUrl}
              timeUnitKey={timeUnitKey}
            />
          </EventWrapper>
        )
      })
    )
  return (
    <TagsContext.Provider value={{ tags, addTag, removeTag }}>
      <Wrapper>
        <TimelineWrapper>
          <div id="top" />
          <GlobalStyles />
          <TimelineNodesWrapper
            ref={containerRef}
            eventMode={measure === 'event'}
          >
            {timelineNodesJsx}
          </TimelineNodesWrapper>
          <TimelineControl
            maxLevel={maxLevel}
            level={level}
            updateLevel={updateLevel}
            stickyStrategy={stickyStrategy}
            selectedTags={tags}
            allTags={allTags}
            headerHeight={headerHeight}
          />
          {measure !== 'event' && (
            <TimelineEventPanel
              event={focusEvent}
              fetchImageBaseUrl={fetchImageBaseUrl}
              stickyStrategy={stickyStrategy}
              timeUnitKey={focusUnitKey}
              headerHeight={headerHeight}
              timeUnitKeys={timeUnitKeys}
              noEventContent={noEventContent}
              sortedAsc={isTimeSortedAsc}
              changeFocusUnitKey={(newFocusUnitKey) => {
                setFocusUnitKey(newFocusUnitKey)
                scroIntoViewType.current = 'smooth'
              }}
            />
          )}
          <div id="bottom" />
        </TimelineWrapper>
      </Wrapper>
    </TagsContext.Provider>
  )
}
