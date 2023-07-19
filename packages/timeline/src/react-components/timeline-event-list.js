import styled from 'styled-components'
import TimelineEvent from './timeline-event'

const Wrapper = styled.div`
  padding: 0 36px 12px;
`

const EventWrapper = styled.div`
  margin-top: 12px;
  border: 2px solid #000;
`

export default function TimelineEventList({ events, fetchImageBaseUrl }) {
  return (
    <Wrapper>
      {events.map((event) => (
        <EventWrapper key={event.id}>
          <TimelineEvent event={event} fetchImageBaseUrl={fetchImageBaseUrl} />
        </EventWrapper>
      ))}
    </Wrapper>
  )
}
