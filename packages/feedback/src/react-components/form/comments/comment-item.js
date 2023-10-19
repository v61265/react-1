import React/* eslint-disable-line */, { useState, useRef, useCallback } from 'react'
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

const Time = styled.time`
  font-size: 14px;
  line-height: 21px;
  color: rgba(0, 9, 40, 30%);
`

const ContentWrapper = styled.div`
  overflow: hidden;
  max-height: 216px;
  @media (max-width: 768px) {
    max-height: 96px;
  }

  &.expanded {
    max-height: unset;
  }
`

const Content = styled.div`
  white-space: pre-line;
  color: rgba(0, 9, 40, 87%);
  font-size: 18px;
  line-height: 36px;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 32px;
  }
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
  const [contentExpanded, setContentExpanded] = useState(false)
  const contentRef = useRef()

  // wrapper is loaded after content
  const onWrapperLoaded = useCallback((node) => {
    if (node && contentRef.current) {
      const wrapperHeight = node.clientHeight
      const contentHeight = contentRef.current.clientHeight

      if (contentHeight > wrapperHeight) {
        setContentExpanded(false)
      } else {
        setContentExpanded(true)
      }
    }
  }, [])

  return (
    <Wrapper className="comment-wrapper">
      <Header className="comment-header">
        <Time>{comment.date}</Time>
        {shouldShowControl && (
          <Control className="comment-control">
            <CommentStrongSvg className="strong" />
            <CommentSvg className="normal" />
          </Control>
        )}
      </Header>
      <ContentWrapper
        className={`comment-content-wrapper ${
          contentExpanded ? 'expanded' : ''
        }`}
        ref={onWrapperLoaded}
      >
        <Content className="comment-content" ref={contentRef}>
          {comment.content}
        </Content>
      </ContentWrapper>
      {!contentExpanded && (
        <ContentExpander
          className="content-expander"
          onMouseUp={() => setContentExpanded(true)}
          type="button"
        >
          展開全部
        </ContentExpander>
      )}
    </Wrapper>
  )
}
