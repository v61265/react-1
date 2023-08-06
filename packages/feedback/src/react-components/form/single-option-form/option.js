import React from 'react' // eslint-disable-line
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`

const OptionIconWrapper = styled.div`
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
  }

  &.disabled {
    cursor: not-allowed;
  }

  &:not(.disabled) {
    &.active,
    &:active,
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.87);
    }
  }
`

const OptionLabel = styled.div`
  color: rgba(0, 0, 0, 0.3);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 200%;
`

const OptionStatistic = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 9, 40, 30%);
  font-weight: 400;

  font-size: 16px;
  line-height: 24px;

  @media ${({ theme }) => theme.breakpoint.tablet} {
    display: none;
  }
`

/**
 * @param {import('../../../typedef').OptionProps} props
 * @return {JSX.Element}
 */
export default function Option({
  onMouseUp,
  selected,
  label,
  value,
  iconSrc,
  statistic,
}) {
  function mouseUpHandler() {
    if (statistic === null) return
    onMouseUp(value)
  }

  const iconClasses = [
    'option-icon-wrapper',
    selected ? 'active' : '',
    statistic === null ? 'disabled' : '',
  ].join(' ')

  return (
    <Wrapper className="option-wrapper">
      <OptionIconWrapper className={iconClasses} onMouseUp={mouseUpHandler}>
        <img src={iconSrc} />
      </OptionIconWrapper>
      <OptionLabel className="option-label">{label}</OptionLabel>
      {statistic !== null && (
        <OptionStatistic className="option-statistic">
          {statistic}
        </OptionStatistic>
      )}
    </Wrapper>
  )
}
