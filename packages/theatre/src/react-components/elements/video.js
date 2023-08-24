import React, { useState, useEffect } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { initialConfig } from '../constants/index.js'

const Video = styled.video`
  position: absolute;
  display: block;
  height: auto;
  box-sizing: border-box;
`

export default function VideoElement({ id, sheet, source, onError }) {
  const object = sheet.object(id, {
    ...initialConfig.VIDEO,
  })

  // Drag setting ----------------------
  const [divRef, setDivRef] = useState(null)

  // Video play/pause ----------------------
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoop, setIsLoop] = useState(false)

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
      setIsLoop(newValue.isLoop)
      setStyle({
        left: `${newValue.position.x}%`,
        top: `${newValue.position.y}%`,
        display: `${newValue.visible ? 'block' : 'none'}`,
        width: `${newValue.size.width}px`,
        height: `${newValue.size.height}px`,
        zIndex: `${newValue.zIndex}`,
        transform: `scale(${newValue.scale}) translate(-50%, -50%)`,
      })
    })
  }, [object])

  return (
    <Video
      muted
      loop={isLoop}
      autoPlay={isPlaying}
      ref={setDivRef}
      style={style}
      preload="auto"
      onEnded={() => {
        setIsPlaying(false)
      }}
      onError={onError}
    >
      <source src={source} />
    </Video>
  )
}
