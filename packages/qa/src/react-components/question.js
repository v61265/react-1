import Radio from './form/radio'
import Checkbox from './form/checkbox'
import Dropdown from './form/dropdown'
import React, { useState } from 'react'
import styled from 'styled-components'

const SubmitBt = styled.div`
  width: 50px;
  height: 50px;
  background-color: pink;
`

/**
 *  @typedef {Object} QuestionProps
 *  @property {Function} onAnswer
 */

/**
 *  @param {import('./typedef').Question & QuestionProps} props
 */
export default function Question(props) {
  const [answer, setAnswer] = useState([])
  let optionsJsx = null
  switch (props.type) {
    // TODO: check what's difference between multiple and checkbox with HC.
    case 'multiple':
    case 'checkbox': {
      // TODO: add Checkbox component
      optionsJsx = (
        <Checkbox 
          title={props.name}
          options={props.options}
          checkedValue={answer}
          onChange={(value) => {setAnswer(value)}}
        />
      )
        
      break
    }
    
    case 'text': {
      // TODO: add TextArea Component
      break
    }

    // TODO: discuss with HC
    // since we have to decide to render Radio component or Dropdown component here
    case 'single': {
      if(props.options.length >=4){
        optionsJsx = (
          <Dropdown
            title={props.name}
            options={props.options}
            checkedValue={answer?.[0]}
            onChange={(value) => {setAnswer([value])}}
          />
        )
      }else {
        optionsJsx = (
          <Radio
            title={props.name}
            options={props.options}
            checkedValue={answer?.[0]}
            onChange={(value) => {setAnswer([value])}}
          />
        )
      }
      break
    }
    default: {
      optionsJsx = (
        <Radio
          title={props.name}
          options={props.options}
          checkedValue={answer?.[0]}
          onChange={(value) => {setAnswer([value])}}
        />
      )
    }
  }
  return (
    <>
      {optionsJsx}
      {/* TODO: change SubmitBt to 依軒's version */}
      <SubmitBt onClick={() => {
        if (answer.length === 0) {
          // User did not answer the question.
          // Do nothing.
          return
        }
        props.onAnswer(answer)
      }}>submit</SubmitBt>
    </>
  )
}

