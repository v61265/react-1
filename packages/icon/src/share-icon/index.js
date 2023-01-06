import { useState } from 'react'
import styled from 'styled-components'

import { ShareIcon } from '~/components/layout/share-components/icons'
import SocialIcons from '~/components/layout/share-components/social-icons'

const SocialIconWrapper = styled.div`
  margin: 24px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  height: auto;

  width: ${/**
   *  @param {Object} props
   *  @param {String | Number} props.width
   */ (props) => (props.width ? props.width : '34px')};

  @media (max-width: 768px) {
    margin: 8px 13px;
    width: ${/**
     *  @param {Object} props
     *  @param {String | Number} props.width
     */ (props) => (props.width ? props.width : '21px')};
  }
`

/**
 * @param {Object} props
 * @param {String} [props.color]
 * - color of icon.
 * - optional, default value is `'#ffffff'`.
 * @param {String | Number} [props.width]
 * - icon width.
 * - optional, default value is `''`.
 * @param {String} [props.direction]
 * - icon width.
 * - optional, default value is `'vertical'`.
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

export default function ShareButtons({
  color = '#ffffff',
  width = '',
  direction = 'horizon',
  onClick,
  LineClick,
  FbClick,
  LinkClick,
}) {
  const [show, setShow] = useState(false)

  function toggleShareIcons() {
    setShow((show) => !show)
  }

  let iconWidth // share-icon width

  switch (typeof width) {
    case 'string':
      iconWidth = width
      break
    case 'number':
      iconWidth = `${width}px`
      break
    default:
      iconWidth = width
  }

  return (
    <SocialIconWrapper
      width={iconWidth}
      onClick={() => {
        toggleShareIcons()
        onClick()
      }}
    >
      <ShareIcon color={color} />
      <SocialIcons
        show={show}
        direction={direction}
        FbClick={FbClick}
        LineClick={LineClick}
        LinkClick={LinkClick}
      />
    </SocialIconWrapper>
  )
}
