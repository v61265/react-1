import React /* eslint-disable-line */, { useState, useEffect }  from 'react'
import styled from 'styled-components'
import Option from './option'
import useOptions from '../../hooks/use-options'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -5px;
  margin-right: -5px;
`

const Title = styled.p`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  align-self: flex-start;
  margin-left: 5px;
  margin-bottom: 15px;

  @media ${({ theme }) => theme.breakpoint.tablet} {
    display: none;
  }
`

const OptionGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
`

/**
 * @typedef {import('../../../typedef').SingleField} SingleField
 *
 * @param {Object}      props
 * @param {string}      props.formId
 * @param {SingleField} props.field
 * @return {JSX.Element}
 */
export default function SingleOptionField({ formId, field }) {
  const [selectedOption, setSelectedOption] = useState(field.selectedItem)

  const { optionSummary, giveOptions } = useOptions(
    formId,
    field.id,
    field.identifier
  )

  const onOptionSelected = (value) => {
    if (optionSummary && value in optionSummary) {
      const defaultOptions = field.selectedItem ? [field.selectedItem] : []

      if (value === selectedOption) {
        // cancel selection
        setSelectedOption(undefined)
        giveOptions(defaultOptions, [])
      } else {
        // select option
        setSelectedOption(value)
        giveOptions(defaultOptions, [value])
      }
    }
  }

  if (typeof field.notifyUpstream === 'function') {
    useEffect(() => {
      if (optionSummary) {
        field.notifyUpstream({
          selectedOption,
          optionSummary,
        })
      }
    }, [selectedOption, optionSummary])
  }

  useEffect(() => {
    setSelectedOption(field.selectedItem)
  }, [field])

  return (
    <Container className="field-container">
      <FieldWrapper className="field-single-option">
        <Title>{field.name}</Title>
        <OptionGroupWrapper className="option-group-wrapper">
          {field.options.map(({ name, value, iconUrl }) => (
            <Option
              key={value}
              label={name}
              value={value}
              iconSrc={iconUrl}
              statistic={
                optionSummary
                  ? value in optionSummary
                    ? optionSummary[value]
                    : null
                  : null
              }
              selected={selectedOption === value}
              onMouseUp={onOptionSelected}
            />
          ))}
        </OptionGroupWrapper>
      </FieldWrapper>
    </Container>
  )
}
