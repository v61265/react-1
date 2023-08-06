import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import ThumbsField from './thumbs-form/thumbs-field'
import CommentField from './comment-form/comment-field'

const FormWrapper = styled.form`
  width: auto;
  margin: 0 20px;
  font-family: 'Noto Sans TC', sans-serif;

  input,
  textarea,
  button {
    font-family: 'Noto Sans TC', sans-serif;
  }

  @media ${({ theme }) => theme.breakpoint.tablet} {
    margin: 0 auto;
    width: 600px;
  }
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`

/**
 * @typedef {import('../../typedef').Form} Form
 *
 * @param {Object}  props
 * @param {Form}    props.form
 * @param {boolean} props.verified
 * @return {JSX.Element}
 */
export default function CustomForm({ form, verified }) {
  return (
    <FormWrapper className="form-feedback">
      {form.fields.map((field) => {
        switch (field.type) {
          case 'text':
            return (
              <CommentField
                key={field.id}
                formId={form.id}
                field={field}
                verified={verified}
              />
            )
          case 'single':
            return <ThumbsField key={field.id} formId={form.id} field={field} />
          default:
            return <FieldWrapper key={field.id}></FieldWrapper>
        }
      })}
    </FormWrapper>
  )
}
