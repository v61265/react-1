import React/* eslint-disable-line */, { useEffect, useRef, useState } from 'react'
import _QuoteShadow from './quote-shadow'
import mockups from './mockups'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'

/**
 * This hook is used to record the mute status in the whole web page.
 * It's useful when there are multiple `Karaoke`s in the same web page.
 * If the user has clicked mute button in one `Karaoke` component,
 * we should mute all the rest audios as well.
 *
 * @param {boolean} initialValue
 * @return {[boolean, Function]}
 */
function useMuted(initialValue = false) {
  const [muted, _setMuted] = useState(initialValue)
  useEffect(() => {
    const _muted = window?.['__readr_react_karaoke']?.muted
    if (typeof _muted === 'boolean') {
      _setMuted(_muted)
    }
  })
  const setMuted = (_muted) => {
    window['__readr_react_karaoke'] = {
      muted: _muted,
    }
    _setMuted(_muted)
  }

  return [muted, setMuted]
}

/**
 *  @param {Object} opts
 *  @param {import('./typedef').Styles} [opts.styles]
 *  @param {string[]} opts.audioUrls,
 *  @param {string} [opts.className]
 *  @param {string} [opts.preload='auto'] - 'auto', 'none' or 'metadata'. `preload` attribute of `audio` tag.
 *  @param {string[]} opts.textArr - quote text
 */
export default function Karaoke({
  audioUrls,
  className,
  preload = 'auto',
  styles,
  textArr,
}) {
  const defaultDuration = 10 // second
  const audioRef = useRef(null)
  const [muted, setMuted] = useMuted(true)
  const [containerRef, inView] = useInView({
    threshold: [0.8, 0.2],
  })

  const [audioOpts, setAudioOpts] = useState({
    paused: !inView,
    duration: defaultDuration,
    currentTime: 0,
    notice: '',
  })

  useEffect(() => {
    const audio = audioRef.current
    const onLoadedMetadata = () => {
      setAudioOpts((opts) => {
        return Object.assign({}, opts, {
          duration: audio.duration || defaultDuration,
        })
      })
    }

    if (audio) {
      audio.addEventListener('loadedmetadata', onLoadedMetadata)
    }

    // clear event listeners
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [])

  useEffect(
    () => {
      const audio = audioRef.current
      if (!audio) {
        return
      }
      // in the viewport
      if (inView) {
        // start with `audioOpts.currentTime` to catch up `QuoteShadow` animation
        audio.currentTime = audioOpts.currentTime
        // set audio muted attribute according to browser muted state
        audio.muted = muted
        const startPlayPromise = audio.play()
        startPlayPromise
          // play successfully
          .then(() => {
            setAudioOpts((opts) =>
              Object.assign({}, opts, {
                // clear notice
                notice: '',
              })
            )
          })
          // fail to play
          .catch((error) => {
            // browser prevent from playing audio before user interactions
            if (error.name === 'NotAllowedError') {
              setAudioOpts((opts) =>
                Object.assign({}, opts, {
                  notice: '請點選聲音播放鍵',
                })
              )
            } else {
              setAudioOpts((opts) =>
                Object.assign({}, opts, {
                  notice: '無法播放音檔，請重新整理頁面',
                })
              )
            }
          })
      } else {
        // leave the viewport
        audio.pause()
      }
      setAudioOpts((opts) =>
        Object.assign({}, opts, {
          paused: !inView,
        })
      )
    },
    // `inView` is used to avoid from infinite re-rendering.
    // `muted` is avoid state not changed due to closure.
    [inView, muted]
  )

  return (
    <Container className={className} ref={containerRef}>
      <audio
        ref={audioRef}
        preload={preload}
        data-readr-karaoke
        data-played={false}
      >
        {audioUrls.map((url, index) => (
          <source key={`audio_source_${index}`} src={url}></source>
        ))}
      </audio>
      <QuoteShadow
        key={`quote_in_view_${inView}` /** use key to force re-rendering */}
        textArr={textArr}
        play={!audioOpts.paused}
        duration={audioOpts.duration}
        styles={styles}
        onCurrentTimeUpdate={(currentTime) => {
          setAudioOpts((opts) =>
            Object.assign({}, opts, {
              currentTime,
            })
          )
        }}
      />
      <AudioBt
        onClick={() => {
          const audio = audioRef.current
          if (audio) {
            if (muted || audioOpts.paused) {
              audio.currentTime = audioOpts.currentTime
              audio.muted = false
              audio.play()
              setMuted(false)
              setAudioOpts((opts) =>
                Object.assign({}, opts, {
                  paused: false,
                  notice: '',
                })
              )
            } else {
              audio.pause()
              setMuted(true)
              setAudioOpts((opts) =>
                Object.assign({}, opts, {
                  paused: true,
                  notice: '',
                })
              )
            }
            audio.setAttribute('data-played', true)
          }

          /**
           *  The following codes are WORKAROUND for Safari.
           *  Problem to workaround:
           *  In Safari, we still encounter `audio.play()` Promise rejection
           *  even users have had interactions. The interactionms, in our case, will be button clicking.
           *
           *  Therefore, the following logics find all Karaoke `audio` elements which has NOT been played before,
           *  and try to `audio.play()` them.
           *  Since this event is triggered by user clicking,
           *  `audio.play()` will be successful without Promise rejection.
           *  After this event finishes, Safari browser won't block `audio.play()` anymore.
           */
          const otherAudios = document.querySelectorAll(
            'audio[data-readr-karaoke][data-played=false]'
          )
          otherAudios.forEach(
            (
              /**
               *  @type HTMLAudioElement
               */
              audio
            ) => {
              audio.muted = true
              const playAttempt = audio.play()
              if (playAttempt) {
                playAttempt
                  // play successfully
                  .then(() => {
                    // pause audio immediately
                    audio.pause()
                  })
                  // fail to play
                  .catch(() => {
                    // do nothing
                  })
              }
            }
          )
        }}
      >
        {audioOpts.paused || muted ? (
          <mockups.audio.PausedButton />
        ) : (
          <mockups.audio.PlayingButton />
        )}
        {audioOpts.notice && <span>{audioOpts.notice}</span>}
      </AudioBt>
    </Container>
  )
}

const QuoteShadow = styled(_QuoteShadow)`
  max-width: 886px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

const AudioBt = styled.div`
  position: absolute;
  cursor: pointer;

  /* update later*/
  left: 27px;
  bottom: 22px;
`
