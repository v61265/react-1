import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  ${({ headerHeight }) => `
    height: calc((100vh - ${headerHeight}px) / 6);
  `}
  width: 320px;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: unset;
  }
`
const LeftPanel = styled.div`
  position: relative;
  width: 94px;
  @media (min-width: 768px) {
    width: 300px;
  }
`
const DateLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 900;
  text-align: right;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  ${({ measure }) => {
    switch (measure) {
      case 'year':
        return `
          margin-right: 48px;
        `
      case 'month':
        return `
          margin-right: 40px;        
        `
      case 'day':
        return `
          margin-right: 40px;        
        `
      default:
        return
    }
  }}
`

const RightPanel = styled.div`
  width: 223px;
  @media (min-width: 768px) {
    width: calc(100% - 300px - 3px);
  }
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (hover: hover) {
    &:hover {
      background: #efefef;
    }
  }
`

const SingleTimelineNode = styled.div`
  position: absolute;
  top: calc(50% - var(--d) / 2);
  left: calc(50% - var(--d) / 2);
  --d: 12px;
  width: var(--d);
  height: var(--d);
  border-radius: 50%;
  background: #000;
  @media (hover: hover) {
    &:hover {
      --d: 16px;
    }
  }
  &:active {
    --d: 16px;
    background: #ec5656;
  }

  cursor: pointer;
  ${({ isFocus }) =>
    isFocus &&
    `
    --d: 16px;
    background: #ec5656;
  `}
`

// const bubbleSizeLevels = [23, 28, 36, 48, 60] // 7等分
const bubbleSizeLevels = [23, 36, 48, 60, 66] // 6等分
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
  isFocus,
  headerHeight,
  measure,
  timeUnitKey,
}) {
  const bubbleSize = bubbleSizeLevels[bubbleSizeLevel]

  let nodeJsx
  if (eventsCount === 0) {
    nodeJsx = null
  } else if (eventsCount === 1) {
    nodeJsx = (
      <SingleTimelineNode
        isFocus={isFocus}
        onClick={onSingleTimelineNodeSelect}
      />
    )
  } else {
    nodeJsx = (
      <TimelineNode bubbleSize={bubbleSize} onClick={onBubbleClick}>
        {eventsCount}
      </TimelineNode>
    )
  }

  return (
    <Wrapper id={'node-' + timeUnitKey} headerHeight={headerHeight}>
      <LeftPanel>
        <DateLabel measure={measure}>{date}</DateLabel>
      </LeftPanel>
      <TimelineWrapper>{nodeJsx}</TimelineWrapper>
      <RightPanel />
    </Wrapper>
  )
}
