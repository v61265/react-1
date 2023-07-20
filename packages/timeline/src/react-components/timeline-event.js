import { useState, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import TimelineEventContent from './timeline-event-content'
import TimelineEventHeader from './timeline-event-header'

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background: #fff;
  overflow: hidden;
  ${({ showAsLightbox }) => {
    if (showAsLightbox) {
      return `
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: scroll;
      z-index: 100;
      background: rgba(0, 0, 0, 0.75);
      `
    }
  }}
`

const TimelineEventWrapper = styled.div`
  position: relative;
  height: 100%;

  ${({ showAsLightbox }) => {
    if (showAsLightbox) {
      return `
      background: #fff;
      height: unset;
      width: 640px;
      margin: 212px auto 40px auto !important;

      @media (max-width: 768px) {
        width: unset;
        margin: 157px 16px 40px 16px !important;
      }
      `
    }
  }}
`

const TimeEventWrapper = styled.div`
  padding: 8px 12px;
`

const TimeEvent = styled.div`
  overflow: hidden;
`

export default function TimelineEvent({
  event,
  fetchImageBaseUrl,
  timeUnitKey,
}) {
  const [showAsLightbox, setShowAsLightbox] = useState(false)
  const wrapperRef = useRef()

  const showLightboxClickedHandler = () => {
    setShowAsLightbox((showLightbox) => !showLightbox)
  }

  return (
    <Wrapper
      id="timeline-event-wrapper"
      showAsLightbox={showAsLightbox}
      onClick={showLightboxClickedHandler}
      ref={wrapperRef}
    >
      {showAsLightbox && <GlobalStyles />}
      <TimelineEventWrapper showAsLightbox={showAsLightbox}>
        <TimeEventWrapper id="TimeEventWrapper">
          <TimeEvent>
            <TimelineEventHeader event={event} timeUnitKey={timeUnitKey} />
            <TimelineEventContent
              event={event}
              fetchImageBaseUrl={fetchImageBaseUrl}
            />
          </TimeEvent>
        </TimeEventWrapper>
      </TimelineEventWrapper>
    </Wrapper>
  )
}
