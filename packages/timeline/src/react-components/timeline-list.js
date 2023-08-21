import { List } from 'react-virtualized'
import TimelineUnit from './timeline-unit'
import { forwardRef } from 'react'
import styled from 'styled-components'

function getBubbleLevel(max, count) {
  const levelSize = max / 5
  return Math.ceil(count / levelSize) - 1
}

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
`

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
    listDimemsion,
    listItemHeight,
    onTimelineListScroll,
  },
  ref
) {
  const { width, height } = listDimemsion

  const rowRenderer = ({ index, key, style }) => {
    const timeUnitKey = timeUnitKeys[index]
    const events = timeUnitEvents[timeUnitKey] || []
    const i = index

    return (
      <RowWrapper className="timeline-list-item" key={key} style={style}>
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
      </RowWrapper>
    )
  }

  return (
    <List
      ref={ref}
      width={width}
      height={height}
      rowHeight={listItemHeight}
      rowCount={timeUnitKeys.length}
      rowRenderer={rowRenderer}
      onScroll={onTimelineListScroll}
    ></List>
  )
})
