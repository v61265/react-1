import React from 'react'

import Section from './layout/Section'
import CommentForm from './textareaForm/CommentForm'

export default function Feedback() {

  const commentFormSubmitHandler = (textareaValue) => {
    console.log(`send comment '${textareaValue}' to BE`);
    return true
  }

  return (
    <>
      <Section>
        <CommentForm onSubmit={commentFormSubmitHandler} />
      </Section>
    </>
  )
}