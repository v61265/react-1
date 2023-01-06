import styled from 'styled-components'

import { MirrorMediaIcon } from '~/components/layout/react-components/icon'

const LogoWrap = styled.div`
  height: auto;
  cursor: pointer;
  display: inline-block;
  margin: 16px 24px;

  width: ${/**
   *  @param {Object} props
   *  @param {String | Number} props.width
   */ (props) => (props.width ? props.width : '90.7px')};

  @media (max-width: 768px) {
    margin: 10px 8px;

    width: ${/**
     *  @param {Object} props
     *  @param {String | Number} props.width
     */ (props) => (props.width ? props.width : '62px')};
  }
`

/**
 * @param {Object} props
 * @param {String} [props.color]
 * - color of icon.
 * - optional, default value is `"#ffffff"`.
 * @param {String | Number} [props.width]
 * - icon width.
 * - optional, default value is `''`.
//  * @param {import("react").MouseEventHandler} [props.onClick]
 * - icon onClick function.
 * - optional, default value is {()=> void}.
 * @returns {JSX.Element}
 */

export default function MirrorIcon({ width, color = '#ffffff', onClick }) {
  let iconWidth // mirror-icon width

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
    <LogoWrap width={iconWidth} onClick={onClick}>
      <a
        href="https://www.mirrormedia.mg"
        target="_blank"
        rel="noreferrer noopenner"
      >
        <MirrorMediaIcon color={color} />
      </a>
    </LogoWrap>
  )
}
