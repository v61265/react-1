import React/* eslint-disable-line */, { useEffect, useRef, useState } from 'react'
import _QuoteShadow from './quote-shadow'
import mockups from './mockups'
import styled from 'styled-components'

/**
 *  @param {Object} opts
 *  @param {import('./typedef').Styles} [opts.styles]
 *  @param {string[]} opts.audioUrls,
 *  @param {string} [opts.className]
 *  @param {string} [opts.preload='auto'] - 'auto', 'none' or 'metadata'. `preload` attribute of `audio` tag.
 *  @param {string[]} opts.textArr - quote text
 */
export default function AudioQuoteShadow({
  audioUrls,
  className,
  preload,
  styles,
  textArr,
}) {
  const defaultDuration = 10 // second
  const audioRef = useRef(null)

  const [audioOpts, setAudioOpts] = useState({
    paused: false,
    canPlay: false,
    duration: defaultDuration,
    notice: '',
  })

  useEffect(() => {
    const audio = audioRef.current
    const onLoadedMetadata = () => {
      setAudioOpts((opts) => {
        return Object.assign({}, opts, {
          duration: audio.duration || defaultDuration
        })
      })
    }

    const onCanPlay = () => {
      setAudioOpts((opts) => {
        return Object.assign({}, opts, {
          canPlay: true
        })
      })
    }

    if (audio) {
      audio.addEventListener('loadedmetadata', onLoadedMetadata)
      audio.addEventListener('canplay', onCanPlay)
    }

    // clear event listeners
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('canplay', onCanPlay)
    }
  },
    // `[...audioUrls]` is used to avoid from re-running the above codes
    [...audioUrls])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }
    const startPlayPromise = audio.play()
    startPlayPromise
    // play successfully
      .then(() => {
        setAudioOpts((opts) => Object.assign({}, opts, {
          // clear notice
          notice: ''
        }))
      })
    // fail to play
      .catch(error => {
        // browser prevent from playing audio before user interactions
        if (error.name === "NotAllowedError") {
          setAudioOpts((opts) => Object.assign({}, opts, {
            notice: '請點選聲音播放鍵'
          }))
        } else {
          // TODO: Handle a load or playback error
        }

        // stop the audio and quote shadow animation
        setAudioOpts((opts) => Object.assign({}, opts, {
          paused: true,
        }))
      });
  })

  return (
    <Container
      className={className}
    >
      <audio
        ref={audioRef}
        preload={preload}
      >
        {audioUrls.map((url, index) => (
          <source key={`audio_source_${index}`} src={url}></source>
        ))}
      </audio>
      <QuoteShadow
        textArr={textArr}
        play={!audioOpts.paused}
        duration={audioOpts.duration}
        styles={styles}
      />
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
