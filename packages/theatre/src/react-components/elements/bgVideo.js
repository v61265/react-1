import React, { useState, useEffect, useRef } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { initialConfig } from '../constants/index.js'

const Video = styled.video`
  position: absolute;
  display: block;
  height: auto;
  box-sizing: border-box;

  /* hide controls on iOS */
  /* &::-webkit-media-controls-panel,
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-start-playback-button {
    display: none !important;
    -webkit-appearance: none !important;
  } */

  width: 100vw;
  height: 100vh;
`

export default function BgVideoElement({ id, sheet, source, onError }) {
  const object = sheet.object(id, {
    ...initialConfig.BGVIDEO,
  })

  const [isVisible, setIsVisible] = useState(false)

  // Style setting ----------------------
  const [style, setStyle] = useState({})

  useEffect(() => {
    object.onValuesChange((newValue) => {
      setIsVisible(newValue.visible)
      setStyle({
        left: `${newValue.position.x}%`,
        top: `${newValue.position.y}%`,
        display: `${newValue.visible ? 'block' : 'none'}`,
        width: `${newValue.size.width}%`,
        height: `${newValue.size.height}%`,
        zIndex: `${newValue.zIndex}`,
        transform: `scale(${newValue.scale}) translate(-50%, -50%)`,
      })
    })
  }, [object])

  const videoRef = useRef(null)

  const setMultipleRefs = (element) => {
    videoRef.current = element
  }

  useEffect(() => {
    let initialScrollPos = 0
    let videoDuration = 0

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const scrollDistance = currentScrollPos - initialScrollPos
      const scrollRatio = scrollDistance / 300

      let newTime
      if (scrollDistance < 0) {
        newTime = Math.max(0, videoDuration + scrollRatio)
      } else {
        newTime = scrollRatio
      }

      if (videoRef.current) {
        videoRef.current.currentTime = newTime
      }
    }

    if (isVisible) {
      initialScrollPos = window.scrollY
      if (videoRef.current) {
        videoDuration = videoRef.current.duration || 0
        videoRef.current.currentTime = 0
      }
      window.addEventListener('scroll', handleScroll)
    } else {
      window.removeEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  return (
    <Video
      className="video"
      muted
      autoPlay={false}
      ref={setMultipleRefs}
      style={style}
      preload="auto"
      onClick={() => {
        studio.setSelection([object])
      }}
      onError={onError}
      controls
    >
      <source src={source} />
    </Video>
  )
}
