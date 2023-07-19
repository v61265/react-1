import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  height: ${({ height }) => (height ? `${height}px` : '100px')};
  width: 320px;
  margin: 0 auto;
  // border: 1px solid black;
`
const LeftPanel = styled.div`
  position: relative;
  width: 94px;
  background-color: #efefef;
`
const DateLabel = styled.label`
  display: block;
  margin: 7px 12px 0 0;
  font-size: 16px;
  font-weight: 900;
  text-align: right;
`

const RightPanel = styled.div`
  width: 223px;
  background-color: #efefef;
`

const TimelineWrapper = styled.div`
  position: relative;
  width: 3px;
  background-color: #000;
`

const TimelineNode = styled.div`
  position: absolute;
  ${({ bubbleSize }) =>
    bubbleSize &&
    `
      top: calc(50% - ${bubbleSize / 2}px);
      left: calc(50% - ${bubbleSize / 2}px);
      width: ${bubbleSize}px;
      height: ${bubbleSize}px;
  `}
  border-radius: 50%;
  border: 2px solid #000;
  background: white;
  &:hover {
    background: lightgray;
  }
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SingleTimelineNode = styled.div`
  position: absolute;
  top: calc(50% - 6px);
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #000;
  &:hover {
    background: #ec5656;
  }
  cursor: pointer;
`

const timelineNodeHeight = 140
const bubbleSizeLevels = [12, 20, 36, 60, 72, 92]

/**
 * @param {Object} props
 * @param {boolean} props.eventsCount - event count
 * @param {number} props.bubbleSizeLevel - bubble size based on event count level
 * @returns
 */
export default function TimelineUnit({
  eventsCount,
  bubbleSizeLevel,
  date,
  onBubbleClick,
  onSingleTimelineNodeSelect,
}) {
  const isSingleEvent = eventsCount === 1

  const bubbleSize = bubbleSizeLevels[bubbleSizeLevel]

  return (
    <Wrapper id={'node-' + date} height={timelineNodeHeight}>
      <LeftPanel>
        <DateLabel>{date}</DateLabel>
      </LeftPanel>
      <TimelineWrapper>
        {isSingleEvent ? (
          <SingleTimelineNode onClick={onSingleTimelineNodeSelect} />
        ) : (
          <TimelineNode bubbleSize={bubbleSize} onClick={onBubbleClick}>
            {eventsCount}
          </TimelineNode>
        )}
      </TimelineWrapper>
      <RightPanel />
    </Wrapper>
  )
}
