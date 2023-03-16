import React /* eslint-disable-line */, {
  useEffect,
  useRef,
  useState,
} from 'react'
import breakpoint from './breakpoint'
import styled from 'styled-components'
import useWindowSize from './hooks/useViewport'
import VideoItem from './video-item'
import mockups from './mockups'
import { getCentralizedMutedManager, useMuted } from './hooks/useMuted'

/**
 *  @param {Object} opts
 *  @param {string} [opts.className]
 *  @param {string} [opts.preload='auto'] - 'auto', 'none' or 'metadata'. `preload` attribute of `video` tag.
 *  @param {boolean} [opts.muteHint=false] - if true, there is another full page to hint how to mute/unmute video.
 *  @param {Object[]} [opts.videoUrls]
 */
export default function FullScreenVideo({
  className,
  preload = 'auto',
  muteHint = false,
  videoUrls,
  voiceHint = '為確保最佳閱讀體驗，建議您開啟聲音、將載具橫放、於網路良好的環境，以最新版本瀏覽器（Chrome 108.0 / Safari 15.5 / Edge 108.0 以上）觀看本專題',
  voiceButton = '確認',
  isDarkMode = false,
}) {
  const allContainerRef = useRef(null)
  const manager = getCentralizedMutedManager()
  const { width } = useWindowSize()
  const [leftOffset, setLeftOffset] = useState(0)
  const [shouldShowHint, setShouldShowHint] = useState(muteHint)
  const [shownVideoIndex, setShownVideoIndex] = useState(null)
  const muted = useMuted(false)

  /**
   *  The following codes are WORKAROUND for Safari.
   *  Problem to workaround:
   *  In Safari, we still encounter `audio.play()` Promise rejection
   *  even users have had interactions. The interactions, in our case, will be button clicking.
   *
   *  Therefore, the following logics find all Karaoke `audio` elements which has NOT been played before,
   *  and try to `audio.play()` them.
   *  Since this event is triggered by user clicking,
   *  `audio.play()` will be successful without Promise rejection.
   *  After this event finishes, Safari browser won't block `audio.play()` anymore.
   */
  const safariWorkaround = () => {
    const otherVideos = document.querySelectorAll(
      'video[data-readr-full-screen-video][data-played=false]'
    )
    otherVideos.forEach(
      (
        /**
         *  @type HTMLAudioElement
         */
        video
      ) => {
        manager.updateMuted(muted)
        const playAttempt = video.play()
        if (playAttempt) {
          playAttempt
            // play successfully
            .then(() => {
              // pause audio immediately
              video.pause()
            })
            // fail to play
            .catch(() => {
              // do nothing
            })
        }
      }
    )
  }

  useEffect(() => {
    for (let i = 0; i < videoUrls.length; i++) {
      if (videoUrls[i].size > width) {
        setShownVideoIndex(i)
        break
      }
    }
    if (!shownVideoIndex) {
      setShownVideoIndex(videoUrls.length - 1)
    }
  }, [width])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    // Adjust video block to cover the whole viewport (100vw)
    const shiftLeft = function() {
      const containerElement = allContainerRef.current
      if (typeof containerElement?.getBoundingClientRect === 'function') {
        const rect = containerElement.getBoundingClientRect()
        const leftOffset = rect?.x ?? rect?.left ?? 0
        setLeftOffset(leftOffset)
      }
    }
    shiftLeft()
  }, [])

  const handleClickHintButton = () => {
    setShouldShowHint(false)
    document.body.style.overflow = 'auto'
    window.scrollTo(0, 0)
    safariWorkaround()
  }

  return (
    <>
      {shouldShowHint ? (
        <HintContainer isDarkMode={isDarkMode}>
          <Text className="hint-text">{voiceHint}</Text>
          <Button className="hint-button" onClick={handleClickHintButton}>
            {voiceButton}
          </Button>
          <AudioBt
            onClick={() => {
              manager.updateMuted(!muted)
              safariWorkaround()
            }}
          >
            {muted ? (
              <mockups.audio.PausedButton />
            ) : (
              <mockups.audio.PlayingButton />
            )}
          </AudioBt>
        </HintContainer>
      ) : (
        <AudioBtnFixed
          isMuted={muted}
          onClick={() => {
            manager.updateMuted(!muted)
          }}
        >
          {muted ? (
            <mockups.audio.PausedButton />
          ) : (
            <mockups.audio.PlayingButton />
          )}
        </AudioBtnFixed>
      )}
      <Container ref={allContainerRef} leftOffset={leftOffset}>
        {videoUrls.map((video, index) => {
          return (
            <section key={`video_source_${index}`}>
              {index === shownVideoIndex && (
                <VideoItem
                  className={className}
                  videoUrl={video.videoUrl}
                  setShownVideoIndex={setShownVideoIndex}
                  preload={preload}
                  muted={muted}
                />
              )}
            </section>
          )
        })}
      </Container>
    </>
  )
}

const Container = styled.div`
  ${/**
   * @param {Object} props
   * @param {number} props.leftOffset
   */
  (props) => {
    const leftOffset = props.leftOffset
    return `transform: translateX(${0 - leftOffset}px);`
  }}
`

const AudioBtnFixed = styled.button`
  position: fixed;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  border: 0;
  top: 89px;
  right: 20px;
  background: #ea5f5f;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  transition: 0.5s;
  z-index: 100;
  &:hover {
    background: #c14d4d;
    cursor: pointer;
  }
  svg {
    width: 21.33px;
    height: 17.33px;
    path {
      fill: #fff;
    }
  }
  @media ${breakpoint.devices.tablet} {
    top: 105px;
  }
  ${(props) => {
    return (
      !props.isMuted &&
      `
      background: #3DC5BD;
        &:hover {
          background: #399E98;
        }
    `
    )
  }}
`

const AudioBt = styled.div`
  cursor: pointer;
  @media ${breakpoint.devices.laptop} {
    position: absolute;
    bottom: 48px;
    right: 48px;
  }
`

const Text = styled.span`
  text-align: center;
  color: #000;
  max-width: 259px;
  font-family: 'PingFang TC';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;

  @media ${breakpoint.devices.tablet} {
    font-size: 20px;
    line-height: 28px;
    max-width: 640px;
  }
`

const HintContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  ${AudioBt} {
    margin-top: 50px;
    & path {
      fill: #000;
    }
    &:hover path {
      fill: #7e7e7e;
    }
  }

  ${(props) =>
    props.isDarkMode &&
    `
      background: #000000;
      .hint-text {
        color: #f5f5f5;
      }
      .hint-button {
        color: #FFFFFF;
        border: 2px solid #FFFFFF;
        background: #000;
        &:hover {
          background: red;
          color: #000000;
          background: #FFFFFF;
        }
      }
      ${AudioBt} {
        & path {
          fill: #fff;
        }
        &:hover path {
          fill: #9D9D9D;
        }
      }
  `}
`

const Button = styled.button`
  font-family: 'PingFang TC';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  padding: 6.5px 14px;
  border: 2px solid #000000;
  border-radius: 8px;
  margin-top: 48px;
  transition: 0.5s;
  background: #fff;
  &:hover {
    background: #e9e9e9;
    cursor: pointer;
  }

  @media ${breakpoint.devices.tablet} {
    margin-top: 97px;
    font-size: 20px;
    line-height: 28px;
  }
`
