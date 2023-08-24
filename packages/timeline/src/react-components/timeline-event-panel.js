import styled from 'styled-components'
import TimelineEvent from './timeline-event'
import Icons from './icons'

const Wrapper = styled.div`
  --mobile-height: 386px;
  --mobile-top: 23vh;

  right: 12px;
  width: 180px;
  height: var(--mobile-height);
  overflow: hidden;
  border: 2px solid #000;
  background: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 4px;
  position: absolute;
  top: calc(
    var(--mobile-top) -
      ${({ headerHeight }) => (headerHeight ? headerHeight : 0)}px
  );

  @media (min-width: 768px) {
    --pc-height: 527px;
    --pc-top: 16vh;
    right: unset;
    left: 387px;
    width: 360px;
    height: var(--pc-height);
    top: calc(
      var(--pc-top) -
        ${({ headerHeight }) => (headerHeight ? headerHeight : 0)}px
    );
  }
`

const EventSwitchControl = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  padding: 0 10px;
  z-index: 1;
`

const EventSwitchControlButtonLabel = styled.span`
  margin: 0 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
`

const EventSwitchControlButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:disabled {
    cursor: unset;
    ${EventSwitchControlButtonLabel} {
      color: #c0c0c0;
      text-decoration: underline;
      cursor: unset;
    }
  }
`

const EmptyEventWrapper = styled.div`
  text-align: center;
`

export default function TimelineEventPanel({
  event,
  fetchImageBaseUrl,
  timeUnitKey,
  headerHeight,
  timeUnitKeys,
  changeFocusUnitKey,
  noEventContent,
  sortedAsc,
}) {
  const indexOfFocusKey = timeUnitKeys.findIndex((key) => key === timeUnitKey)
  let lastKeyIndex, nextKeyIndex
  if (sortedAsc) {
    if (indexOfFocusKey === -1) {
      // the timeUnitKey is not inside timeUnitKeys, it's an empty event node
      nextKeyIndex = timeUnitKeys.findIndex(
        (key) => Number(key) > Number(timeUnitKey)
      )
      lastKeyIndex = nextKeyIndex - 1
    } else {
      lastKeyIndex = indexOfFocusKey - 1 >= 0 ? indexOfFocusKey - 1 : -1
      nextKeyIndex =
        indexOfFocusKey + 1 < timeUnitKeys.length ? indexOfFocusKey + 1 : -1
    }
  } else {
    if (indexOfFocusKey === -1) {
      // the timeUnitKey is not inside timeUnitKeys, it's an empty event node
      nextKeyIndex = timeUnitKeys.findIndex(
        (key) => Number(key) < Number(timeUnitKey)
      )
      lastKeyIndex = nextKeyIndex - 1
    } else {
      lastKeyIndex = indexOfFocusKey - 1 >= 0 ? indexOfFocusKey - 1 : -1
      nextKeyIndex =
        indexOfFocusKey + 1 < timeUnitKeys.length ? indexOfFocusKey + 1 : -1
    }
  }
  const lastEventDisabled = lastKeyIndex === -1
  const nextEventDisabled = nextKeyIndex === -1

  const panelContentJsx = !!event ? (
    <TimelineEvent
      event={event}
      fetchImageBaseUrl={fetchImageBaseUrl}
      timeUnitKey={timeUnitKey}
    />
  ) : (
    <EmptyEventWrapper
      dangerouslySetInnerHTML={{
        __html: noEventContent,
      }}
    />
  )

  return (
    <Wrapper headerHeight={headerHeight}>
      {panelContentJsx}
      <EventSwitchControl>
        <EventSwitchControlButton
          disabled={lastEventDisabled}
          onClick={(evt) => {
            evt.stopPropagation()
            changeFocusUnitKey(timeUnitKeys[lastKeyIndex])
          }}
        >
          {lastEventDisabled ? (
            <Icons.LastArrowDisabled />
          ) : (
            <Icons.LastArrow />
          )}
          <EventSwitchControlButtonLabel>
            上個日期
          </EventSwitchControlButtonLabel>
        </EventSwitchControlButton>
        <EventSwitchControlButton
          disabled={nextEventDisabled}
          onClick={(evt) => {
            evt.stopPropagation()
            changeFocusUnitKey(timeUnitKeys[nextKeyIndex])
          }}
        >
          <EventSwitchControlButtonLabel>
            下個日期
          </EventSwitchControlButtonLabel>
          {nextEventDisabled ? (
            <Icons.NextArrowDisabled />
          ) : (
            <Icons.NextArrow />
          )}
        </EventSwitchControlButton>
      </EventSwitchControl>
    </Wrapper>
  )
}
