import React/* eslint-disable-line */, { useState } from 'react'
import styled from 'styled-components'

import Comments from '../comments/comments'
import Textarea from './texarea'
import useComments from '../../hooks/use-comments'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
`

const Button = styled.button`
  margin-top: 12px;
  width: 120px;
  background-color: #04295e;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 18px;
  line-height: 27px;

  &:hover,
  &:focus {
    background-color: #000928;
  }
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

/**
 * @typedef {import('../../../typedef').TextField} TextField
 *
 * @param {Object}    props
 * @param {string}    props.id
 * @param {TextField} props.field
 * @param {boolean}   props.verified
 * @return {JSX.Element}
 */
export default function CommentField({ formId, field, verified }) {
  const [enableSumbit, setEnableSubmit] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')
  const {
    comments,
    noMoreComment,
    loadMoreComments,
    postComment,
  } = useComments(formId, field.id)

  const textareaChangedHandler = (e) => {
    const value = e.target.value
    setEnableSubmit(!!value)
    setTextareaValue(value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!textareaValue.trim()) {
      return
    }
    await postComment(textareaValue)

    setTextareaValue('')
    setEnableSubmit(false)
  }

  return (
    <Wrapper>
      {verified && (
        <>
          <Textarea
            placeholder={field.name}
            textAreaValue={textareaValue}
            onChange={textareaChangedHandler}
          />
          <ButtonWrapper>
            <Button disabled={!enableSumbit} onClick={submitHandler}>
              送出
            </Button>
          </ButtonWrapper>
        </>
      )}
      <Comments
        comments={comments}
        onExpand={loadMoreComments}
        noMoreComment={noMoreComment}
        listTitle={field.commentListTitle}
        shouldShowControl={field.shouldShowItemControl}
      />
    </Wrapper>
  )
}
