import React from 'react'

import Section from './layout/Section'
import CommentForm from './comment-form/CommentForm'
import useRecaptcha from '../hooks/useRecaptcha'

export default function Feedback() {
  const { verified } = useRecaptcha()

  const commentFormSubmitHandler = (textareaValue) => {
    console.log(`send comment '${textareaValue}' to BE`);
    return true
  }

  if (verified) {
    console.log('show comment form!')
  }

  return (
    <>
      <Section>
        {verified && <CommentForm onSubmit={commentFormSubmitHandler} />}
      </Section>
    </>
  )
}