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

  ${({ stickyStrategy, headerHeight }) => {
    switch (stickyStrategy) {
      case 'absolute':
        return `
        position: absolute;
        top: calc(var(--mobile-top) - ${headerHeight}px);
        `
      case 'fixed':
        return `
          position: fixed;
          top: var(--mobile-top);
          right: calc((100vw - 320px) / 2 + 12px);
        `
      case 'absolute-bottom':
        return `
          position: absolute;
          bottom: calc(100vh - var(--mobile-top) - var(--mobile-height));
        `
      case 'absolute-top':
      default:
        return `
          position: absolute;
          top: calc(var(--mobile-top) - ${headerHeight}px);
        `
    }
  }}

  @media (min-width: 768px) {
    --pc-height: 527px;
    --pc-top: 16vh;
    right: unset;
    left: 387px;
    width: 360px;
    height: var(--pc-height);
    ${({ stickyStrategy, headerHeight }) => {
      switch (stickyStrategy) {
        case 'absolute':
          return `
          position: absolute;
          top: calc(var(--pc-top) - ${headerHeight}px);
          `
        case 'fixed':
          return `
            position: fixed;
            top: var(--pc-top);
            right: calc((100vw - 320px) / 2 + 12px);
          `
        case 'absolute-bottom':
          return `
            position: absolute;
            bottom: calc(100vh - var(--pc-top) - var(--pc-height));
          `
        case 'absolute-top':
        default:
          return `
            position: absolute;
            top: calc(var(--pc-top) - ${headerHeight}px);
          `
      }
    }}
  }
  @media (min-width: 1200px) {
    ${({ stickyStrategy }) =>
      stickyStrategy === 'fixed' &&
      `
      left: calc((100vw - 1200px)/2 + 387px);
    `}
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
  stickyStrategy,
  timeUnitKey,
  headerHeight,
  timeUnitKeys,
  changeFocusUnitKey,
  noEventContent,
}) {
  const indexOfFocusKey = timeUnitKeys.findIndex((key) => key === timeUnitKey)
  let lastKeyIndex, nextKeyIndex
  if (indexOfFocusKey === -1) {
    nextKeyIndex = timeUnitKeys.findIndex(
      (key) => Number(key) > Number(timeUnitKey)
    )
    lastKeyIndex = nextKeyIndex - 1
  } else {
    lastKeyIndex = indexOfFocusKey - 1 >= 0 ? indexOfFocusKey - 1 : -1
    nextKeyIndex =
      indexOfFocusKey + 1 < timeUnitKeys.length ? indexOfFocusKey + 1 : -1
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
    <Wrapper stickyStrategy={stickyStrategy} headerHeight={headerHeight}>
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
