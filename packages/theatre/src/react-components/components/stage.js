import React from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import FontElement from '../elements/font.js'
import ImageElement from '../elements/image.js'
import BackgroundElement from '../elements/background.js'

const Wrapper = styled.div`
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: auto;
`

export default function Stage({ objectJson = [], sheet }) {
  if (!objectJson.length) {
    return null
  }

  const fontElements = objectJson
    .filter((data) => data.type === 'FONT')
    .map((data) => {
      return <FontElement key={'font' + data.id} id={data.id} sheet={sheet} />
    })

  const imageElements = objectJson
    .filter((data) => data.type === 'IMAGE')
    .map((data) => {
      return <ImageElement key={'image' + data.id} id={data.id} sheet={sheet} />
    })

  const bgElements = objectJson
    .filter((data) => data.type === 'BACKGROUND')
    .map((data) => {
      return (
        <BackgroundElement
          key={'background' + data.id}
          id={data.id}
          sheet={sheet}
        />
      )
    })

  return (
    <Wrapper id="theatre-stage">
      {fontElements}
      {imageElements}
      {bgElements}
    </Wrapper>
  )
}
