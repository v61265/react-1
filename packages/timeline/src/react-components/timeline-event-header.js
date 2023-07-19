import styled from 'styled-components'
import { customFormatTime } from '../utils/date'

const CategoryWrapper = styled.div`
  padding: 0 116px;
  @media (max-width: 768px) {
    padding: 0;
  }
`

const Category = styled.span`
  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
  margin-right: 8px;
  color: #999;
`

const PublishInfoWrapper = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 116px;

  @media (max-width: 768px) {
    align-items: start;
    flex-direction: column;
    padding: 0;
  }
`

const PublisherWrapper = styled.div`
  display: flex;
  align-items: center;
`
/*
const PublisherAvatar = styled.span`
  margin-right: 8px;
  display: inline-block;
  width: 36px;
  height: 36px;
  background: #c4c4c4;
  border: 1px solid #000000;
  border-radius: 50%;

  @media (max-width: 768px) {
    display: none;
  }
`*/
const PublisherName = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 900;
  line-height: 17px;

  @media (max-width: 768px) {
    margin-left: unset;
  }
`

const PublishDate = styled.div`
  font-size: 12px;
  transform: scale(calc(10 / 12));
  font-weight: 900;
  line-height: 14px;

  @media (max-width: 768px) {
    position: relative;
    left: calc(-100% / 12);
    width: 100%;
    margin-top: 4px;
  }
`

export default function TimelineEventHeader({ event }) {
  return (
    <div>
      {event.type !== 'external' ? (
        <>
          <CategoryWrapper>
            {event.tags?.map((tag, idx) => {
              return <Category key={idx}>{tag?.name}</Category>
            })}
          </CategoryWrapper>
          <PublishInfoWrapper>
            <PublisherWrapper>
              {/* <PublisherAvatar /> */}
              <PublisherName>
                {event.author ? `記者：${event.author}` : ''}
              </PublisherName>
            </PublisherWrapper>
            <PublishDate>
              {customFormatTime(event.publishTime, event.displayDateString)}
            </PublishDate>
          </PublishInfoWrapper>
        </>
      ) : (
        <PublishInfoWrapper>
          <div>
            {event.tags?.map((tag, idx) => {
              return <Category key={idx}>{tag?.name}</Category>
            })}
          </div>
          <PublishDate>
            {customFormatTime(event.publishTime, event.displayDateString)}
          </PublishDate>
        </PublishInfoWrapper>
      )}
    </div>
  )
}
