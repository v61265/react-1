import TimelineUnit from './timeline-unit'

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
  return timeUnitKeys.map((timeUnitKey, i) => {
    const events = timeUnitEvents[timeUnitKey] || []
    return (
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
    )
  })
}
