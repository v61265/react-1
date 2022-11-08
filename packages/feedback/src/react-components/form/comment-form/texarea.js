import React from 'react' // eslint-disable-line
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 159px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  vertical-align: top;
  overflow: auto;
`

/**
 * @param {Object} props
 * @param {string} props.placeholder
 * @param {string} props.textAreaValue
 * @param {React.ChangeEventHandler<HTMLTextAreaElement>} props.onChange
 * @return {JSX.Element}
 */
export default function CustomTextarea(props) {
  return (
    <Wrapper>
      <Textarea
        placeholder={props.placeholder}
        name="feedback-post"
        onChange={props.onChange}
        value={props.textAreaValue}
      />
    </Wrapper>
  )
}
