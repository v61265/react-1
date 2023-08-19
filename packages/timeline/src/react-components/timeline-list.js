import { List } from 'react-virtualized'
import TimelineUnit from './timeline-unit'
import { forwardRef } from 'react'

function getBubbleLevel(max, count) {
  const levelSize = max / 5
  return Math.ceil(count / levelSize) - 1
}

export default forwardRef(function TimelineList(
  {
    timeUnitKeys,
    timeUnitEvents,
    timeMax,
    divider,
    bubbleLevelSizesInDivider,
    onBubbleClick,
    onSingleTimelineNodeSelect,
    focusUnitKey,
    headerHeight,
    measure,
    firstTimeUnitKey,
    lastTimeUnitKey,
    listHeight,
    listItemHeight,
    onTimelineListScroll,
  },
  ref
) {
  const rowRenderer = ({ index, key, style }) => {
    const timeUnitKey = timeUnitKeys[index]
    const events = timeUnitEvents[timeUnitKey] || []
    const i = index

    return (
      <div className="timeline-list-item" key={key} style={style}>
        <TimelineUnit
          eventsCount={events.length}
          bubbleSizeLevel={getBubbleLevel(timeMax, events.length)}
          divider={divider}
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
            timeUnitKey === firstTimeUnitKey || timeUnitKey === lastTimeUnitKey
          }
        />
      </div>
    )
  }

  return (
    <List
      ref={ref}
      width={1200}
      height={listHeight}
      rowHeight={listItemHeight}
      rowCount={timeUnitKeys.length}
      rowRenderer={rowRenderer}
      onScroll={onTimelineListScroll}
    ></List>
  )
})
