import styled from 'styled-components'
import { generateDateString, isEdgeUnit } from '../utils/timeline'

const Wrapper = styled.div`
  display: flex;
  ${({ headerHeight, divider }) => `
    height: calc((100vh - ${headerHeight}px) / ${divider});
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

const YearLabel = styled.label`
  position: absolute;
  padding-bottom: 34px;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 900;
  text-align: right;
  color: rgb(138, 138, 138);
  ${({ measure }) => {
    switch (measure) {
      case 'year':
        return `
        right: 48px;
      `
      case 'month':
        return `
        right: 40px;        
      `
      case 'day':
        return `
        right: 40px;        
      `
      default:
        return
    }
  }}
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
const defaultBubbleLevelSizes = [23, 28, 36, 48, 60]

/**
 * @param {Object} props
 * @param {boolean} props.eventsCount - event count
 * @param {number} props.bubbleSizeLevel - bubble size based on event count level
 * @returns
 */
export default function TimelineUnit({
  eventsCount,
  bubbleSizeLevel,
  onBubbleClick,
  onSingleTimelineNodeSelect,
  isFocus,
  headerHeight,
  measure,
  timeUnitKey,
  isTheFirstOrLastUnit,
  dividers,
  bubbleLevelSizesInDivider,
}) {
  const divider = dividers[measure]
  const bubbleLevelSizes =
    bubbleLevelSizesInDivider[divider] || defaultBubbleLevelSizes
  const bubbleSize = bubbleLevelSizes[bubbleSizeLevel]
  const date = generateDateString(timeUnitKey, measure)
  let showYear = false
  if (measure === 'month' || measure === 'day') {
    showYear = isEdgeUnit(timeUnitKey, measure) || isTheFirstOrLastUnit
  }

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
    <Wrapper
      id={'node-' + timeUnitKey}
      headerHeight={headerHeight}
      divider={divider}
    >
      <LeftPanel>
        {showYear && (
          <YearLabel measure={measure}>{timeUnitKey.slice(0, 4)}</YearLabel>
        )}
        <DateLabel measure={measure}>{date}</DateLabel>
      </LeftPanel>
      <TimelineWrapper>{nodeJsx}</TimelineWrapper>
      <RightPanel />
    </Wrapper>
  )
}
