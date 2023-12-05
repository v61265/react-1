import React from 'react' // eslint-disable-line
import styled from 'styled-components'

import CommentItem from './comment-item'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 0 60px 0;
  width: 100%;

  @media (max-width: 767px) {
    margin: 40px 0 32px 0;
  }
`

const Title = styled.p`
  margin: 0 0 4px 0;
  font-size: 32px;
  line-height: 48px;
  font-weight: 700;
`

const DefaultText = styled.p``

const ButtonWrapper = styled.div`
  margin-top: 24px;
  text-align: center;
`

const Button = styled.button`
  margin-top: 12px;
  width: 280px;
  background-color: none;
  color: #04295e;
  border: 1px solid #04295e;
  border-radius: 6px;
  padding: 12px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 18px;
  line-height: 27px;

  &:hover,
  &:active {
    background-color: #edeff2;
  }
`

/**
 * @typedef {import('../../../typedef').Comment} Comment
 * @typedef {import('../../../typedef').CommentManager} CommentManager
 * @typedef {CommentManager['loadMoreComments']} ExpandFunc
 *
 * @param {Object}      props
 * @param {Comment[]}   props.comments
 * @param {ExpandFunc}  props.onExpand
 * @param {boolean}     props.noMoreComment
 * @param {string}      [props.listTitle='網友回饋']
 * @param {boolean}     [props.shouldShowControl=true]
 * @param {string}      [props.defaultText]
 * @return {JSX.Element}
 */
export default function Comments({
  comments,
  onExpand,
  noMoreComment,
  listTitle = '網友回饋',
  shouldShowControl = true,
  defaultText,
}) {
  const clickHandler = (e) => {
    e.preventDefault()
    onExpand()
  }

  return (
    <Wrapper className="list-container">
      {listTitle && <Title className="list-title">{listTitle}</Title>}

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          shouldShowControl={shouldShowControl}
        />
      ))}

      {comments.length === 0 && defaultText && (
        <DefaultText className="default-text">{defaultText}</DefaultText>
      )}

      {!noMoreComment && (
        <ButtonWrapper className="list-control">
          <Button onClick={clickHandler}>展開更多</Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  )
}
