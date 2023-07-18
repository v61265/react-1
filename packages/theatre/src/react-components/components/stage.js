import React from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { defaultFontStyle, defaultImageStyle } from '../shared-style/index.js'

const Wrapper = styled.div`
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  z-index: 1000;
`

const FontElement = styled.div`
  ${defaultFontStyle}
`

const ImageElement = styled.div`
  ${defaultImageStyle}
  background-image: url(${(props) => props.url});
`

export default function Stage({ elements = [] }) {
  const fontElements = elements
    .filter((data) => data.type === 'FONT')
    .map((data, index) => {
      return (
        <FontElement key={index} id={data.id}>
          {data.content}
        </FontElement>
      )
    })

  const imageElements = elements
    .filter((data) => data.type === 'IMAGE')
    .map((data, index) => {
      return <ImageElement key={index} id={data.id} url={data.url} />
    })

  return (
    <Wrapper id="theatre-stage">
      {fontElements}
      {imageElements}
    </Wrapper>
  )
}
