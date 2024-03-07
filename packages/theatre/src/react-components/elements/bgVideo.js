import React, { useState, useEffect, useRef } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import { initialConfig } from '../constants/index.js'

const BgVideo = styled.video`
  position: absolute;
  display: block;
  height: auto;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
`

export default function BgVideoElement({ id, sheet, source, onLoad, onError }) {
  const object = sheet.object(id, {
    ...initialConfig.BGVIDEO,
  })

  const [isVisible, setIsVisible] = useState(false)

  // Style setting ----------------------
  const [style, setStyle] = useState({})
  const [scrollSpeed, setScrollSpeed] = useState(2000)

  useEffect(() => {
    object.onValuesChange((newValue) => {
      setIsVisible(newValue.visible)
      setScrollSpeed(newValue.speed)
      setStyle({
        left: `${newValue.position.x}%`,
        top: `${newValue.position.y}%`,
        display: `${newValue.visible ? 'block' : 'none'}`,
        width: `${newValue.size.width}%`,
        height: `${newValue.size.height}%`,
        zIndex: `${newValue.zIndex}`,
        transform: `scale(${newValue.scale}) translate(-50%, -50%)`,
        opacity: `${newValue.opacity}`,
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
      const scrollRatio = scrollDistance / scrollSpeed //每滾動 scrollSpeed px 會播放 1s 影片

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
  }, [isVisible, scrollSpeed])

  // get buffer time ----------------------
  const [bufferTime, setBufferTime] = useState(0)

  useEffect(() => {
    const video = videoRef.current

    const handleProgress = () => {
      const bufferedTimeRanges = video.buffered
      if (bufferedTimeRanges.length > 0) {
        const bufferedTime = bufferedTimeRanges.end(
          bufferedTimeRanges.length - 1
        )
        setBufferTime(bufferedTime)
      }
    }

    if (video) {
      video.addEventListener('progress', handleProgress)

      return () => {
        video.removeEventListener('progress', handleProgress)
      }
    }
  }, [videoRef])

  // Loading setting ----------------------
  const [isVideoLoading, setIsVideoLoading] = useState(true)

  useEffect(() => {
    let videoDuration = videoRef.current.duration || 0
    let threshold = videoDuration / 4 > 10 ? 10 : videoDuration / 4

    if (!isVideoLoading && bufferTime > threshold) {
      onLoad()
    }
  }, [isVideoLoading, bufferTime])

  return (
    <BgVideo
      muted
      autoPlay={false}
      ref={setMultipleRefs}
      style={style}
      preload="auto"
      playsInline={true}
      onClick={() => {
        studio.setSelection([object])
      }}
      onWaiting={() => {
        setIsVideoLoading(true)
      }}
      onCanPlay={() => {
        setIsVideoLoading(false)
      }}
      onPlay={(e) => {
        e.target.pause()
      }}
      onEnded={(e) => {
        e.target.pause()
      }}
      onError={() => {
        onError()
        setIsVideoLoading(false)
      }}
    >
      <source src={source} />
    </BgVideo>
  )
}
