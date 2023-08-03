import React/* eslint-disable-line */, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import CommentSvg from '../../../static/icon-comment.svg'
import CommentStrongSvg from '../../../static/icon-comment-strong.svg'

const Control = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;

  .normal {
    display: none;
  }
  .strong {
    display: none;
  }
  @media (max-width: 1200px) {
    .normal {
      display: block;
    }
  }
`

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  border: none;
  border-radius: 6px;
  padding: 16px 24px;
  font: inherit;
  outline: inherit;
  width: 100%;
  text-align: left;

  &:hover {
    @media (min-width: 1201px) {
      .normal {
        display: block;
      }
    }
  }

  &:active {
    .normal {
      display: none;
    }
    .strong {
      display: block;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Time = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: rgba(0, 9, 40, 30%);
`

const Content = styled.div`
  white-space: pre-line;
  color: rgba(0, 9, 40, 87%);
  font-size: 18px;
  line-height: 36px;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 32px;
  }
  ${({ contentTooLong, contentExpand }) =>
    contentTooLong && !contentExpand
      ? `
      max-height: 216px;
      @media (max-width: 768px) {
        max-height: 96px;
      }
    `
      : ''}
`

const ContentExpander = styled.button`
  background-color: transparent;
  color: rgba(0, 9, 40, 30%);
  font-size: 18px;
  line-height: 36px;
  border: 0;
  padding: 0;
  cursor: pointer;
`

/**
 * @typedef {import('../../../typedef').Comment} Comment
 *
 * @param {Object}  props
 * @param {Comment} props.comment
 * @param {boolean} [props.shouldShowControl]
 * @return {JSX.Element}
 */
export default function CommentItem({ comment, shouldShowControl }) {
  const [contentExpand, setContentExpand] = useState(false)
  const [contentTooLong, setContentTooLong] = useState(false)
  const contentRef = useRef()

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const limit = isMobile ? 96 : 216
    if (contentRef.current) {
      const height = contentRef.current.clientHeight
      if (height > limit) {
        setContentTooLong(true)
      }
    }
  }, [])

  return (
    <Wrapper>
      <Header>
        <Time>{comment.date}</Time>
        {shouldShowControl && (
          <Control>
            <CommentStrongSvg className="strong" />
            <CommentSvg className="normal" />
          </Control>
        )}
      </Header>
      <Content
        contentTooLong={contentTooLong}
        contentExpand={contentExpand}
        ref={contentRef}
      >
        {comment.content}
      </Content>
      {contentTooLong && !contentExpand && (
        <ContentExpander onMouseUp={() => setContentExpand(true)}>
          展開全部
        </ContentExpander>
      )}
    </Wrapper>
  )
}
