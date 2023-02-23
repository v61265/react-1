import React from 'react' // eslint-disable-line
import { useState } from 'react'
import styled from 'styled-components'

import { ShareIcon } from './react-components/icon'
import SocialIcon from './react-components/social-icon'

const ButtonWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;

  width: ${/**
   *  @param {Object} props
   *  @param {string} props.size
   */ (props) => (props.size ? props.size : '21px')};

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 768px) {
    width: ${/**
     *  @param {Object} props
     *  @param {string} props.size
     */ (props) => (props.size ? props.size : '28px')};
  }
`

/**
 * @param {Object} props
 * @param {string} [props.color]
 * - color of button.
 * - optional, default value is `''`.
 * @param {string | number} [props.size]
 * - size of button.
 * - optional, default value is `''`.
 * @param {string} [props.direction]
 * - toggle direction.
 * - optional, default value is `'vertical'`.
 * @param {string} [props.className]
 * - className of button.
 * - optional, default value is `'share-button'`.
 * @param {import("react").MouseEventHandler} [props.onClick]
 * - share-icon onClick function.
 * - optional, default value is {()=> void}.
 * @param {import("react").MouseEventHandler} [props.FbClick]
 * - FB-icon onClick function.
 * - optional, default value is {()=> void}.
 * @param {import("react").MouseEventHandler} [props.LineClick]
 * - Line-icon onClick function.
 * - optional, default value is {()=> void}.
 * @param {import("react").MouseEventHandler} [props.LinkClick]
 * - Link-icon onClick function.
 * - optional, default value is {()=> void}.
 * @returns {JSX.Element}
 */

export function ShareButton({
  color = '',
  size = '',
  direction = 'vertical',
  className = 'share-button',
  onClick,
  LineClick,
  FbClick,
  LinkClick,
}) {
  const [show, setShow] = useState(false)

  function toggleShareIcons() {
    setShow((show) => !show)
  }

  let buttonSize

  switch (typeof size) {
    case 'string':
      buttonSize = size
      break
    case 'number':
      buttonSize = `${size}px`
      break
    default:
      buttonSize = size
  }

  return (
    <ButtonWrapper
      className={className}
      size={buttonSize}
      onClick={() => {
        toggleShareIcons()
        onClick()
      }}
    >
      <ShareIcon color={color} />
      <SocialIcon
        show={show}
        size={buttonSize}
        direction={direction}
        FbClick={FbClick}
        LineClick={LineClick}
        LinkClick={LinkClick}
      />
    </ButtonWrapper>
  )
}
