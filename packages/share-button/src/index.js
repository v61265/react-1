import React from 'react' // eslint-disable-line
import { useState } from 'react'
import styled from 'styled-components'

import { ShareIcon } from './react-components/icon'
import SocialIcon from './react-components/social-icon'

const ButtonWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;
  width: 21px;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 768px) {
    width: 28px;
  }
`

/**
 * @param {Object} props
 * @param {string} [props.pathColor]
 * @param {string} [props.direction='vertical']
 * @param {string} [props.className='readr-share-button']
 * @param {import("react").MouseEventHandler} [props.onClick]
 * @param {import("react").MouseEventHandler} [props.FbClick]
 * @param {import("react").MouseEventHandler} [props.LineClick]
 * @param {import("react").MouseEventHandler} [props.LinkClick]
 * @return {JSX.Element}
 */

export function ShareButton({
  pathColor = '',
  direction = 'vertical',
  className = 'readr-share-button',
  onClick,
  LineClick,
  FbClick,
  LinkClick,
}) {
  const [show, setShow] = useState(false)

  function toggleShareIcons() {
    setShow((show) => !show)
  }

  return (
    <ButtonWrapper
      className={className}
      onClick={() => {
        toggleShareIcons()
        onClick()
      }}
      aria-label="點擊展開社群分享按鈕"
    >
      <ShareIcon pathColor={pathColor} />
      <SocialIcon
        show={show}
        direction={direction}
        FbClick={FbClick}
        LineClick={LineClick}
        LinkClick={LinkClick}
      />
    </ButtonWrapper>
  )
}
