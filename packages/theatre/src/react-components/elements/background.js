import React, { useState, useEffect } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { initialConfig } from '../constants/index.js'

const BgWrapper = styled.div`
  position: absolute;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export default function BackgroundElement({ id, sheet, onLoad, onError }) {
  const object = sheet.object(id, {
    ...initialConfig.BACKGROUND,
  })

  // Style setting ----------------------
  const [style, setStyle] = useState({})
  const [imageUrl, setImageUrl] = useState(
    'https://unpkg.com/@readr-media/react-theatre/assets/default-image.png'
  )

  useEffect(() => {
    object.onValuesChange((newValue) => {
      setImageUrl(newValue.url)
      setStyle({
        left: `${newValue.position.x}%`,
        top: `${newValue.position.y}%`,
        width: `${newValue.size.width}%`,
        height: `${newValue.size.height}%`,
        borderRadius: `${newValue.border.radius}%`,
        border: `${newValue.border.size}px solid ${newValue.border.color}`,
        background: `${newValue.bgColor}`,
        opacity: `${newValue.opacity}`,
        display: `${newValue.visible ? 'block' : 'none'}`,
        transform: `scale(${newValue.scale}) translate(-50%, -50%)`,
        zIndex: `${newValue.zIndex}`,
      })
    })
  }, [object])

  return (
    <BgWrapper style={style}>
      <img src={imageUrl} alt={id} onLoad={onLoad} onError={onError} />
    </BgWrapper>
  )
}
