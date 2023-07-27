import React, { useState, useEffect } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { initialConfig } from '../constants/index.js'

const ImageWrapper = styled.div`
  position: absolute;
  display: block;
  overflow: hidden;
  height: auto;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`

export default function ImageElement({ id, sheet }) {
  const object = sheet.object(id, {
    ...initialConfig.IMAGE,
  })

  // Style setting ----------------------
  const [style, setStyle] = useState({})
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    object.onValuesChange((newValue) => {
      setImageUrl(newValue.url)
      setStyle({
        left: `${newValue.position.x}%`,
        top: `${newValue.position.y}%`,
        width: `${newValue.size.width}px`,
        borderRadius: `${newValue.border.radius}%`,
        border: `${newValue.border.size}px solid ${newValue.border.color}`,
        background: `${newValue.bgColor}`,
        opacity: `${newValue.opacity}`,
        display: `${newValue.visible ? 'block' : 'none'}`,
        backgroundImage: `url(${newValue.url})`,
        transform: `scale(${newValue.scale})`,
        zIndex: `${newValue.zIndex}`,
      })
    })
  }, [object])

  return (
    <ImageWrapper style={style}>
      <img src={imageUrl} alt={id} />
    </ImageWrapper>
  )
}
