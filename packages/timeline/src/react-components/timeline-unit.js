import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  height: calc((100vh - 70px) / 7);
  width: 320px;
  margin: 0 auto;
`
const LeftPanel = styled.div`
  position: relative;
  width: 94px;
`
const DateLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 900;
  text-align: right;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 8px;
`

const RightPanel = styled.div`
  width: 223px;
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

const bubbleSizeLevels = [23, 28, 36, 48, 60] // 7等分
// const bubbleSizeLevels = [23, 36, 48, 60, 76] // 5等分

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
  emptyId,
}) {
  if (date === 'empty') {
    return <TimelineUnitEmpty emptyId={emptyId} />
  }
  const isSingleEvent = eventsCount === 1
  const bubbleSize = bubbleSizeLevels[bubbleSizeLevel]

  return (
    <Wrapper id={'node-' + date}>
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

const DashLine = styled.div`
  position: relative;
  width: 3px;
  --s: 14px; /* control the space between dashes */
  background: radial-gradient(circle closest-side, #000 98%, #0000) 0 0/100%
      var(--s),
    linear-gradient(transparent 13px, #000 15px) 0 calc(var(--s) / 2) / 100%
      calc(2 * var(--s));
`
const Top = styled.div`
  width: 15px;
  position: absolute;
  top: -1.5px;
  left: calc(50% - 15px / 2);
  height: 3px;
  background: #000;
  border-radius: 3px;
`

const Bottom = styled.div`
  width: 15px;
  position: absolute;
  bottom: -1.5px;
  left: calc(50% - 15px / 2);
  height: 3px;
  background: #000;
  border-radius: 3px;
`

function TimelineUnitEmpty({ emptyId }) {
  return (
    <Wrapper id={'node-' + emptyId}>
      <LeftPanel />
      <DashLine>
        <Top />
        <Bottom />
      </DashLine>
      <RightPanel />
    </Wrapper>
  )
}
