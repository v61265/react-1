import styled from 'styled-components'
import TimelineEvent from './timeline-event'

const Wrapper = styled.div`
  right: 12px;
  width: 180px;
  height: 356px;
  overflow: hidden;
  border: 2px solid #000;
  background: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ stickyStrategy }) => {
    switch (stickyStrategy) {
      case 'fixed':
        return `
          position: fixed;
          top: 130px;
        `
      case 'absolute-bottom':
        return `
          position: absolute;
          bottom: 82px;
        `
      case 'absolute-top':
      default:
        return `
          position: absolute;
          top: 130px;
        `
    }
  }}
`

export default function TimelineEventPanel({
  event,
  fetchImageBaseUrl,
  stickyStrategy,
}) {
  const panelContentJsx = !!event ? (
    <TimelineEvent event={event} fetchImageBaseUrl={fetchImageBaseUrl} />
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

  return <Wrapper stickyStrategy={stickyStrategy}>{panelContentJsx}</Wrapper>
}
