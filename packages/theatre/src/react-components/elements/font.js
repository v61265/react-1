import React, { useState, useEffect } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { initialConfig } from '../constants/index.js'

const FontWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  transform-origin: center;
  box-sizing: border-box;
`

export default function FontElement({ id, sheet }) {
  const object = sheet.object(id, {
    ...initialConfig.FONT,
  })

  // Style setting ----------------------
  const [style, setStyle] = useState({})
  const [content, setContent] = useState('')

  useEffect(() => {
    object.onValuesChange((newValue) => {
      setContent(newValue.content)
      setStyle({
        left: `${newValue.position.x}%`,
        top: `${newValue.position.y}%`,
        background: `${newValue.bgColor}`,
        color: `${newValue.font.color}`,
        opacity: ` ${newValue.opacity}`,
        padding: `${newValue.padding}px`,
        display: `${newValue.visible ? 'block' : 'none'}`,
        width: `${newValue.size.width}px`,
        maxWidth: `${newValue.size.width}px`,
        fontSize: `${newValue.font.size}px`,
        borderRadius: `${newValue.border.radius}px`,
        border: `${newValue.border.size}px solid ${newValue.border.color}`,
        fontWeight: `${newValue.font.weight}`,
        letterSpacing: `${newValue.font.spacing}px`,
        lineHeight: `{newValue.lineHeight}px`,
        textAlign: `${newValue.textAlign}`,
        zIndex: `${newValue.zIndex}`,
        transform: `scale(${newValue.scale}) translate(-50%, -50%)`,
      })
    })
  }, [object])

  return (
    <FontWrapper style={style} dangerouslySetInnerHTML={{ __html: content }} />
  )
}
