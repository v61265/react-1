import styled from 'styled-components'
import TimelineEvent from './timeline-event'

const Wrapper = styled.div`
  --mobile-height: 356px;
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
    --pc-height: 497px;
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

export default function TimelineEventPanel({
  event,
  fetchImageBaseUrl,
  stickyStrategy,
  timeUnitKey,
  headerHeight,
}) {
  const panelContentJsx = !!event ? (
    <TimelineEvent
      event={event}
      fetchImageBaseUrl={fetchImageBaseUrl}
      timeUnitKey={timeUnitKey}
    />
  ) : (
    <span
      style={{
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#989898',
      }}
    >
      點擊泡泡
      <br />
      或往下滑動
    </span>
  )

  return (
    <Wrapper stickyStrategy={stickyStrategy} headerHeight={headerHeight}>
      {panelContentJsx}
    </Wrapper>
  )
}
