import { FixedSizeList } from 'react-window'
import TimelineUnit from './timeline-unit'
import { useEffect, useRef, useState } from 'react'

function getBubbleLevel(max, count) {
  const levelSize = max / 5
  return Math.ceil(count / levelSize) - 1
}

export default function TimelineList({
  timeUnitKeys,
  timeUnitEvents,
  timeMax,
  dividers,
  bubbleLevelSizesInDivider,
  onBubbleClick,
  onSingleTimelineNodeSelect,
  focusUnitKey,
  headerHeight,
  measure,
  firstTimeUnitKey,
  lastTimeeUnitKey,
}) {
  const [listHeight, setListHeight] = useState(800)
  const divider = dividers[measure]
  const listItemHeight = listHeight / divider
  const listRef = useRef(null)

  useEffect(() => {
    setListHeight(window.innerHeight - headerHeight)
  }, [headerHeight])

  const Row = ({ index, style }) => {
    const timeUnitKey = timeUnitKeys[index]
    const events = timeUnitEvents[timeUnitKey] || []
    const i = index

    return (
      <div style={style}>
        <TimelineUnit
          eventsCount={events.length}
          bubbleSizeLevel={getBubbleLevel(timeMax, events.length)}
          dividers={dividers}
          bubbleLevelSizesInDivider={bubbleLevelSizesInDivider}
          key={timeUnitKey + i}
          onBubbleClick={onBubbleClick.bind(null, timeUnitKey)}
          onSingleTimelineNodeSelect={onSingleTimelineNodeSelect.bind(
            null,
            timeUnitKey
          )}
          isFocus={timeUnitKey === focusUnitKey}
          headerHeight={headerHeight}
          measure={measure}
          timeUnitKey={timeUnitKey}
          isTheFirstOrLastUnit={
            timeUnitKey === firstTimeUnitKey || timeUnitKey === lastTimeeUnitKey
          }
        />
      </div>
    )
  }

  return (
    <FixedSizeList
      ref={listRef}
      width={'100vw'}
      height={listHeight}
      itemSize={listItemHeight}
      itemCount={timeUnitKeys.length}
    >
      {Row}
    </FixedSizeList>
  )
}
