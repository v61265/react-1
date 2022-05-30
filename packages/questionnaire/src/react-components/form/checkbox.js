import React from 'react'
import styled from 'styled-components'

const Title = styled.h3`
  padding: 16px 0;
  line-height: 200%;
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  box-sizing: border-box;
  font-family: 'Noto Sans CJK TC', sans-serif;
  width: 320px;
  margin: 0;
`

const CheckboxWrapper = styled.section`
  * {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
    list-style: none;
    box-sizing: border-box;
    margin: 0;
    font-family: 'Noto Sans CJK TC', sans-serif;
    padding: 0;
  }
  width: 320px;
  display: flex;
  flex-direction: column;
  padding: 16px 24px 20px;
`

const CheckboxOptionList = styled.ul`
  position: relative;
  margin: 0;
  padding: 4px 0;
  max-height: 240px;
  overflow-y: auto;
`

const CheckboxOption = styled.li`
  color: #000928;
  width: 100%;
  cursor: pointer;
  padding: 8px 0;
  color: #000928;
  text-align: left;
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked {
        background: red;
      }
    }
    .checkmark {
      position: absolute;
      top: 2.5px;
      left: 5px;
      height: 20px;
      width: 20px;
      border: 2px solid rgba(0, 9, 40, 0.3);
      border-radius: 3px;
      &:after {
        content: '';
        position: absolute;
        display: none;
      }
    }
    input:checked ~ .checkmark {
      background: #04295e;
      &:after {
        display: block;
      }
    }
    .checkmark:after {
      top: 0;
      left: 5px;
      width: 5px;
      height: 10px;
      border: solid #f6f6f5;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
`

const defaultTitle = '這是複選題'

/**
 *  @param {Object} props
 *  @param {import('../typedef').Option[]} props.options
 *  @param {string} props.title
 *  @param {string[]} props.checkedValue
 *  @param {Function} props.onChange
 *  @return React.ReactElement
 */

export default function Checkbox({
  title = defaultTitle,
  checkedValue = [],
  ...props
}) {
  const chooseOption = (option) => {
    if (checkedValue.indexOf(option) > -1) {
      props.onChange(checkedValue.filter((item) => item !== option))
    } else {
      props.onChange(checkedValue.concat(option))
    }
  }
  const optionItem = props.options.map((option) => (
    <CheckboxOption key={`option-${option.id}`}>
      <label className="container" htmlFor={`option-${option.id}`}>
        {option.name}
        <input
          type="checkbox"
          id={`option-${option.id}`}
          value={option.value}
          onChange={(e) => {
            chooseOption(e.target.value)
          }}
        />
        <span className="checkmark"></span>
      </label>
    </CheckboxOption>
  ))

  return (
    <React.Fragment>
      <CheckboxWrapper>
        <Title>{title}</Title>
        <CheckboxOptionList>{optionItem}</CheckboxOptionList>
      </CheckboxWrapper>
    </React.Fragment>
  )
}
