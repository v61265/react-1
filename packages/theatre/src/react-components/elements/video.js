import React, { useMemo, useState, useEffect } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { initialConfig } from '../constants/index.js'

const Video = styled.video`
  position: absolute;
  display: block;
  height: auto;
  box-sizing: border-box;
  background: black;
`

export default function VideoElement({ id, sheet, source, onLoad, onError }) {
  const object = sheet.object(id, {
    ...initialConfig.VIDEO,
  })

  // Drag setting ----------------------
  const [divRef, setDivRef] = useState(null)

  // Video play/pause ----------------------
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (divRef && isPlaying) {
      divRef?.play()
    } else {
      divRef?.pause()
    }
  }, [isPlaying])

  // Style setting ----------------------
  const [style, setStyle] = useState({})

  useEffect(() => {
    object.onValuesChange((newValue) => {
      setIsPlaying(newValue.isPlaying)
      setStyle({
        left: `${newValue.position.x}%`,
        top: `${newValue.position.y}%`,
        display: `${newValue.visible ? 'block' : 'none'}`,
        width: `${newValue.size.width}px`,
        height: `${newValue.size.height}px`,
        zIndex: `${newValue.zIndex}`,
        transform: `scale(${newValue.scale})`,
      })
    })
  }, [object])

  return (
    <Video
      muted
      autoPlay={isPlaying}
      ref={setDivRef}
      style={style}
      preload="auto"
      onEnded={() => {
        setIsPlaying(false)
      }}
      onLoadedData={onLoad}
      onError={onError}
    >
      <source src={source} />
    </Video>
  )
}
