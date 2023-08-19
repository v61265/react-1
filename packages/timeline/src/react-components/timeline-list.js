import { List } from 'react-virtualized'
import TimelineUnit from './timeline-unit'
import { forwardRef } from 'react'

function getBubbleLevel(max, count) {
  const levelSize = max / 5
  return Math.ceil(count / levelSize) - 1
}

export default forwardRef(function TimelineList(
  {
    timeUnitKeysToRender,
    timeUnitEvents,
    timeMax,
    divider,
    bubbleLevelSizesInDivider,
    onBubbleClick,
    onSingleTimelineNodeSelect,
    focusUnitKey,
    headerHeight,
    measure,
    firstTimeUnitKeyToRender,
    lastTimeUnitKeyToRender,
    lastTimeUnitKey,
    updateFocusKey,
    listHeight,
    listItemHeight,
  },
  ref
) {
  const rowRenderer = ({ index, key, style }) => {
    const timeUnitKey = timeUnitKeysToRender[index]
    const events = timeUnitEvents[timeUnitKey] || []
    const i = index

    return (
      <div key={key} style={style}>
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
            timeUnitKey === firstTimeUnitKeyToRender ||
            timeUnitKey === lastTimeUnitKeyToRender
          }
        />
      </div>
    )
  }

  return (
    <List
      id="123"
      ref={ref}
      width={1200}
      height={listHeight}
      rowHeight={listItemHeight}
      rowCount={timeUnitKeysToRender.length}
      rowRenderer={rowRenderer}
      onScroll={() => {
        if (ref.current) {
          const container = ref.current.Grid._scrollingContainer // Access the actual scrolling container
          if (container) {
            const isAtBottom =
              container.scrollHeight - container.scrollTop ===
              container.clientHeight
            if (isAtBottom) {
              updateFocusKey(lastTimeUnitKey)
            }
          }
        }
      }}
      onRowsRendered={({ startIndex }) => {
        updateFocusKey(timeUnitKeysToRender[startIndex])
      }}
    ></List>
  )
})
