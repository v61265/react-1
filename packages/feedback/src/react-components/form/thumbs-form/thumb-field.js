import React from 'react' // eslint-disable-line
import styled from 'styled-components'

import ThumbUpSvg from '../../../static/icon-thumb-up.svg'
import ThumbDownSvg from '../../../static/icon-thumb-down.svg'

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  &:last-child {
    margin-left: 40px;
  }
`

// able to uncheck radio button
const ThumbMockLabel = styled.div`
  position: relative;
  padding-top: 60px;
  color: ${({ theme }) => theme.thumbField.label.color};
  font-weight: ${({ theme }) => theme.thumbField.label.fontWeight};
  line-height: ${({ theme }) => theme.thumbField.label.lineHeight};

  font-size: ${({ theme }) => theme.thumbField.label.mobile.fontSize};
  @media ${({ theme }) => theme.breakpoint.tablet} {
    font-size: ${({ theme }) => theme.thumbField.label.tablet.fontSize};
  }
`

const ThumbIconWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: calc((100% - 56px) / 2);
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.thumbField.thumb.default.borderColor};
  border-radius: 50%;
  color: ${({ theme }) => theme.thumbField.thumb.default.color};
  background-color: ${({ theme }) =>
    theme.thumbField.thumb.default.backgroundColor};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.thumbField.thumb.hover.color};
    background-color: ${({ theme }) =>
      theme.thumbField.thumb.hover.backgroundColor};
    border-color: ${({ theme }) => theme.thumbField.thumb.hover.borderColor};
  }
  &:active,
  &.active {
    color: ${({ theme }) => theme.thumbField.thumb.active.color};
    background-color: ${({ theme }) =>
      theme.thumbField.thumb.active.backgroundColor};
    border-color: ${({ theme }) => theme.thumbField.thumb.active.borderColor};
  }
`

const Input = styled.input`
  display: none;

  &:checked ~ ${ThumbIconWrapper} {
    color: ${({ theme }) => theme.thumbField.thumb.active.color};
    background-color: ${({ theme }) =>
      theme.thumbField.thumb.active.backgroundColor};
    border-color: ${({ theme }) => theme.thumbField.thumb.active.borderColor};
  }
`

const ThumbStatistic = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.thumbField.statistic.color};
  font-weight: ${({ theme }) => theme.thumbField.statistic.fontWeight};

  font-size: ${({ theme }) => theme.thumbField.statistic.mobile.fontSize};
  line-height: ${({ theme }) => theme.thumbField.statistic.mobile.lineHeight};
  @media ${({ theme }) => theme.breakpoint.tablet} {
    font-size: ${({ theme }) => theme.thumbField.statistic.tablet.fontSize};
    line-height: ${({ theme }) => theme.thumbField.statistic.tablet.lineHeight};
  }
`

/**
 * @param {import('../../../typedef').ThumbsFieldProps} props
 * @return {JSX.Element}
 */
export default function ThumbField({
  thumbsUp,
  onMouseDown,
  onMouseUp,
  checked,
  pressing,
  label,
  statistic,
}) {
  const ThumbSVG = thumbsUp ? <ThumbUpSvg /> : <ThumbDownSvg />

  function mouseDownHandler() {
    if (statistic === null) return
    onMouseDown()
  }

  function mouseUpHandler() {
    if (statistic === null) return
    onMouseUp()
  }
  return (
    <Wrapper>
      <ThumbMockLabel onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}>
        {label}
        <Input
          type="radio"
          name="thumbs"
          onChange={() => {}}
          checked={checked}
        />
        <ThumbIconWrapper className={pressing || checked ? 'active' : ''}>
          {ThumbSVG}
        </ThumbIconWrapper>
      </ThumbMockLabel>
      {statistic !== null && <ThumbStatistic>{statistic}</ThumbStatistic>}
    </Wrapper>
  )
}
