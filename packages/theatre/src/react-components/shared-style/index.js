import { css } from '../../styled-components.js'

const defaultFontStyle = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  transform-origin: center;
`

const defaultImageStyle = css`
  position: absolute;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export { defaultFontStyle, defaultImageStyle }
