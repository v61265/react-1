import styled from 'styled-components'
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

const Wrapper = styled.div`
  background-color: #efefef;
  overflow: hidden;
  width: 100vw;
  height: calc(
    100vh - ${({ headerHeight }) => (headerHeight ? headerHeight : '0px')}
  );
  position: relative;
  left: calc(50% - 50vw);

  // reset for Timeline only
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
  // hide react-virtualized List scrollbar
  &,
  & > div {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari and Opera */
    }
  }
  overflow: hidden auto;
  ${({ height }) => height && `height: ${height}px;`}
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
  const firstTimeUnitKeyToRender = timeKeysToRender[0]
  const lastTimeUnitKeyToRender = timeKeysToRender[timeKeysToRender.length - 1]
  const timeUnitKeysToRender = timeKeysToRender[measure]
  const divider = dividers[measure]
  const [listHeight, setListHeight] = useState(800)
  const listItemHeight = listHeight / divider

  /** @type {React.RefObject<HTMLDivElement>} */
  const containerRef = useRef(null)

  const scroIntoViewType = useRef('')
  const blockOnScrollEvent = useRef(false)
  const timelineListRef = useRef(null)
  console.log('focusUnitKey', focusUnitKey)

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
    console.log('updateLevel setFocusUnitKey', newFocusUnitKey)
    setLevel(newLevel)
  }

  useEffect(() => {
    setListHeight(window.innerHeight - headerHeight)
  }, [headerHeight])

  // handle event mode updating focusUnitKey when user scrolling
  useEffect(() => {
    if (level !== 1) {
      // only event mode needs onScroll event to update focusUnitKey
      return
    }
    console.log('onscroll in event mdoe')

    if (containerRef.current) {
      const onScroll = () => {
        const containerDiv = containerRef.current
        // block update focusUnitKey when programmatically scrolling
        if (blockOnScrollEvent.current) {
          return
        }
        let newFocusNode
        for (const node of containerDiv.children) {
          const rect = node.getBoundingClientRect()
          if (rect.top - headerHeight + rect.height > 0) {
            newFocusNode = node
            break
          }
        }
        let newFocusUnitKey = newFocusNode.id.split('-')[1]
        setFocusUnitKey(newFocusUnitKey)
      }

      containerRef.current.addEventListener('scroll', onScroll)

      return () => {
        containerRef.current.removeEventListener('scroll', onScroll)
      }
    }
  }, [level, headerHeight])

  // handle timeline mode updating focusUnitKey when user scrolling
  const onTimelineListScroll = () => {
    if (containerRef.current) {
      /** @type {HTMLDivElement} */
      const containerDiv = containerRef.current
      const containerTop = containerDiv.getBoundingClientRect().top
      if (blockOnScrollEvent.current) {
        return
      }
      const timeNodes = containerDiv.querySelectorAll('.timeline-list-item')
      let firstVisibleIndex
      for (let index = 0; index < timeNodes.length; index++) {
        const node = timeNodes[index]
        const distanceToTop =
          node.getBoundingClientRect().top -
          containerTop +
          node.getBoundingClientRect().height -
          10
        if (distanceToTop > 0) {
          firstVisibleIndex = index
          break
        }
      }
      let focusNode = timeNodes[firstVisibleIndex]
      if (focusNode) {
        let newFocusUnitKey = focusNode.firstChild.id.split('-')[1]
        setFocusUnitKey(newFocusUnitKey)
        console.log('onTimelineListScroll setFocusUnitKey', newFocusUnitKey)
      } else {
        // Use cmd up or down to control timeline could cause lost track of focus
        // ignore it for now.
        console.warn('onTimelineListScroll focusNode undefined', focusNode)
      }
    }
  }

  // handle scroll timeline (List, Events) to right position
  useEffect(() => {
    //debug
    console.log('debug, set timelineListRef.current to list')
    window.list = timelineListRef.current

    // block no scrollType
    if (!scroIntoViewType.current) {
      return
    }

    if (timelineListRef.current) {
      // handle scrolling on react.virtualized List
      const focusIndex = timeUnitKeysToRender.findIndex(
        (unitKey) => unitKey === focusUnitKey
      )

      if (focusIndex !== -1) {
        if (scroIntoViewType.current === 'immediate') {
          // since scrollToRow can guarantee to scroll the focusItem to the topmost, use scrollToPosition instead
          console.log(
            'scrollToPosition immediate',
            focusIndex * listItemHeight + 5,
            focusUnitKey
          )
          timelineListRef.current.scrollToPosition(
            focusIndex * listItemHeight + 5
          )
        } else if (scroIntoViewType.current === 'smooth') {
          function smoothScrollTo(targetPosition, speedFactor) {
            const startPosition =
              timelineListRef.current.Grid._scrollingContainer.scrollTop
            const distance = Math.abs(targetPosition - startPosition)
            const speed = speedFactor

            const duration = Math.min(2000, Math.max(300, distance / speed)) // Set a maximum and minimum duration to avoid extremely long or short scrolls
            const startTime = performance.now()

            function scrollStep(timestamp) {
              const currentTime = timestamp - startTime
              const scrollFraction = currentTime / duration

              if (currentTime >= duration) {
                timelineListRef.current.scrollToPosition(targetPosition)
                blockOnScrollEvent.current = false
              } else {
                const easeValue = scrollFraction ** 2 // You can adjust the easing function here
                const scrollValue =
                  startPosition +
                  (targetPosition > startPosition ? 1 : -1) *
                    distance *
                    easeValue
                timelineListRef.current.scrollToPosition(scrollValue)
                window.requestAnimationFrame(scrollStep)
                return
              }
            }

            window.requestAnimationFrame(scrollStep)
          }

          blockOnScrollEvent.current = true
          smoothScrollTo(focusIndex * listItemHeight + 5, 20)
        }
        scroIntoViewType.current = ''
      } else {
        // since focusKey can't map to a html node (may be filtered out)
        // scroll to the first node
        const newFocusUnitKey = timeUnitKeys[0]
        setFocusUnitKey(newFocusUnitKey)
        blockOnScrollEvent.current = true
        console.log('filter out focusKey set first one', newFocusUnitKey)
      }
    } else if (containerRef.current) {
      // handle scrolling on event mode

      const focusTimelineUnitEle = containerRef.current.querySelector(
        `#node-${focusUnitKey}`
      )

      if (focusTimelineUnitEle) {
        // add 2 px to prevent focusIndex count on scroll mistaken
        if (scroIntoViewType.current === 'immediate') {
          blockOnScrollEvent.current = false
          console.log(
            'scrollTo ',
            containerRef.current.scrollTop +
              focusTimelineUnitEle.getBoundingClientRect().top +
              5 -
              headerHeight
          )
          containerRef.current.scrollTo(
            0,
            containerRef.current.scrollTop +
              focusTimelineUnitEle.getBoundingClientRect().top +
              5 -
              headerHeight
          )
        }
        scroIntoViewType.current = ''
      } else {
        // since focusKey can't map to a html node (may be filtered out)
        // scroll to the first node
        const newFocusUnitKey = timeUnitKeys[0]
        setFocusUnitKey(newFocusUnitKey)
        blockOnScrollEvent.current = true
        console.log('filter out focusKey set first one', newFocusUnitKey)
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
      console.log('addTag', newFocusUnitKey)
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
        ref={timelineListRef}
        timeUnitKeys={timeUnitKeysToRender}
        timeUnitEvents={timeUnitEvents}
        timeMax={timeMax}
        divider={divider}
        bubbleLevelSizesInDivider={bubbleLevelSizesInDivider}
        onBubbleClick={(timeUnitKey) => {
          updateLevel(level - 1, timeUnitKey)
        }}
        onSingleTimelineNodeSelect={(timeUnitKey) => {
          setFocusUnitKey(timeUnitKey)
          console.log('onSingleTimelineNodeSelect setFocusUnitKey', timeUnitKey)
        }}
        focusUnitKey={focusUnitKey}
        headerHeight={headerHeight}
        measure={measure}
        firstTimeUnitKey={firstTimeUnitKeyToRender}
        lastTimeUnitKey={lastTimeUnitKeyToRender}
        listHeight={listHeight}
        listItemHeight={listItemHeight}
        onTimelineListScroll={onTimelineListScroll}
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
      <Wrapper headerHeight={headerHeight}>
        <TimelineWrapper>
          <TimelineNodesWrapper
            id="containerRef"
            ref={containerRef}
            eventMode={measure === 'event'}
            height={listHeight}
          >
            {timelineNodesJsx}
          </TimelineNodesWrapper>
          <TimelineControl
            maxLevel={maxLevel}
            level={level}
            updateLevel={updateLevel}
            selectedTags={tags}
            allTags={allTags}
            headerHeight={headerHeight}
          />
          {measure !== 'event' && (
            <TimelineEventPanel
              event={focusEvent}
              fetchImageBaseUrl={fetchImageBaseUrl}
              timeUnitKey={focusUnitKey}
              headerHeight={headerHeight}
              timeUnitKeys={timeUnitKeys}
              noEventContent={noEventContent}
              sortedAsc={isTimeSortedAsc}
              changeFocusUnitKey={(newFocusUnitKey) => {
                setFocusUnitKey(newFocusUnitKey)
                console.log(
                  'changeFocusUnitKey setFocusUnitKey',
                  newFocusUnitKey
                )
                scroIntoViewType.current = 'smooth'
              }}
            />
          )}
        </TimelineWrapper>
      </Wrapper>
    </TagsContext.Provider>
  )
}
