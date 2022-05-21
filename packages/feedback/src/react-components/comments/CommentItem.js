import React, { useState } from 'react'
import styled from 'styled-components'

import CommentSvg from '../../static/icon-comment.svg'
import CommentStrongSvg from '../../static/icon-comment-strong.svg'

const MobileSVGWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1200px) {
    display: none;
  }
`

const PCSVGWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1199px) {
    display: none;
  }
`

const Wrapper = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 6px;
  padding: 16px 24px;
  font: inherit;
  outline: inherit;
  width: 100%;
  text-align: left;
  cursor: pointer;
  // cursor: ${({ contentExpand }) => contentExpand ? 'auto' : 'pointer'};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Date = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: rgba(0, 9, 40, 30%)
`

const Content = styled.div`
  white-space: pre-line;
  color: rgba(0, 9, 40, 87%);
  font-size: 18px;
  line-height: 36px;
  overflow: hidden;
  height: ${({ contentExpand }) => contentExpand ? 'unset' : '216px'};
`

const Hint = styled.div`
  color: rgba(0, 9, 40, 30%);
  font-size: 18px;
  line-height: 36px;
`

export default function CommentItem({ comment }) {
  const [contentExpand, setContentExpand] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPressing, setIsPressing] = useState(false)

  const feedbackClickedHandler = (e) => {
    console.log('end of pressing')
    setIsPressing(false)
    e.target.blur()
    setContentExpand((contentExpand) => !contentExpand)
  }

  let PCSVG
  if (isHovering) {
    PCSVG = <CommentSvg />
  }
  if (isPressing) {
    PCSVG = <CommentStrongSvg />
  }

  return <Wrapper contentExpand={contentExpand} onMouseOver={() => (setIsHovering(true))} onMouseOut={() => (setIsHovering(false))} onMouseDown={() => { setIsPressing(true) }} onMouseUp={feedbackClickedHandler}>
    <Header>
      <Date>{comment.date}</Date>
      <MobileSVGWrapper>
        {isHovering || isPressing ? < CommentStrongSvg /> : <CommentSvg />}
      </MobileSVGWrapper>
      <PCSVGWrapper>
        {isPressing ? <CommentStrongSvg /> : (isHovering ? <CommentSvg /> : null)}
      </PCSVGWrapper>
    </Header>
    <Content contentExpand={contentExpand} >{comment.content}</Content>
    {!contentExpand && <Hint>展開全部</Hint>}
  </Wrapper >
}