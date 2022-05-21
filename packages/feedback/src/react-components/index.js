import React from 'react'

import Section from './layout/Section'
import ThumbsForm from './thumbs-form/ThumbsForm'
import CommentForm from './comment-form/CommentForm'
import useRecaptcha from '../hooks/useRecaptcha'

export default function Feedback() {
  const { verified } = useRecaptcha()

  const commentFormSubmitHandler = (textareaValue) => {
    console.log(`send comment '${textareaValue}' to BE`);
    return true
  }

  const thumbsFormSubmitHandler = (thumbValue) => {
    console.log(`send thumbValue '${thumbValue}' to BE`);
    return true
  }

  return (
    <>
      <Section>
        <ThumbsForm onSubmit={thumbsFormSubmitHandler} />
        {verified && <CommentForm onSubmit={commentFormSubmitHandler} />}
      </Section>
    </>
  )
}