import React /* eslint-disable-line */, {
  useEffect,
  useRef,
  useState,
} from 'react'
import breakpoint from './breakpoint'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
// import useMuted from './hooks/useMuted'

/**
 *  @param {Object} opts
 *  @param {string} [opts.className]
 *  @param {string} [opts.preload='auto'] - 'auto', 'none' or 'metadata'. `preload` attribute of `video` tag.
 *  @param {Object[]} [opts.videoUrl]
 *  @param {boolean} [opts.mute]
 */
export default function VideoItem({
  preload = 'auto',
  videoUrl,
  setShownVideoIndex,
  muted,
}) {
  const defaultDuration = 10 // second
  const videoRef = useRef(null)
  // const [muted, setMuted] = useMuted(false)
  const [containerRef, inView] = useInView({
    threshold: [0.6],
  })

  const [videoOpts, setVideoOpts] = useState({
    paused: !inView,
    duration: defaultDuration,
    currentTime: 0,
    notice: '',
  })

  useEffect(() => {
    const video = videoRef.current
    const onLoadedMetadata = () => {
      setVideoOpts((opts) => {
        return Object.assign({}, opts, {
          duration: video.duration || defaultDuration,
        })
      })
    }

    if (video) {
      video.addEventListener('loadedmetadata', onLoadedMetadata)
    }

    // clear event listeners
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [])

  useEffect(
    () => {
      const video = videoRef.current
      if (!video) {
        return
      }
      // video.muted = false
      // in the viewport
      if (inView) {
        // start with `videoOpts.currentTime` to catch up `QuoteShadow` animation
        video.currentTime = videoOpts.currentTime
        const startPlayPromise = video.play()
        startPlayPromise
          // play successfully
          .then(() => {
            setVideoOpts((opts) =>
              Object.assign({}, opts, {
                // clear notice
                notice: '',
              })
            )
          })
          // fail to play
          .catch((error) => {
            console.log(error)
            // browser prevent from playing video before user interactions
            if (error.name === 'NotAllowedError') {
              setVideoOpts((opts) =>
                Object.assign({}, opts, {
                  notice: '請點選聲音播放鍵',
                })
              )
            } else {
              setVideoOpts((opts) =>
                Object.assign({}, opts, {
                  notice: '無法播放音檔，請重新整理頁面',
                })
              )
              setShownVideoIndex()
            }
          })
      } else {
        // leave the viewport
        video.pause()
      }
      setVideoOpts((opts) =>
        Object.assign({}, opts, {
          paused: !inView,
        })
      )
    },
    // `inView` is used to avoid from infinite re-rendering.
    // `muted` is avoid state not changed due to closure.
    [inView]
  )

  return (
    <VideoContainer ref={containerRef}>
      <video
        ref={videoRef}
        preload={preload}
        data-readr-full-screen-video
        data-played={true}
        controls
        muted={muted}
      >
        <source key={`video_source`} src={videoUrl}></source>
      </video>
    </VideoContainer>
  )
}

const AudioBt = styled.div`
  cursor: pointer;
`

const VideoContainer = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  video {
    width: 100%;
  }

  video::-webkit-media-controls-volume-slider {
    display: none;
  }

  video::-webkit-media-controls-mute-button {
    display: none;
  }

  ${AudioBt} {
    left: 12px;
    bottom: 12px;
    position: absolute;
    cursor: pointer;

    @media ${breakpoint.devices.tablet} {
      left: 27px;
      bottom: 22px;
    }
  }
`
