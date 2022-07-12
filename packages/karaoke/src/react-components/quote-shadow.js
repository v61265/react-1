import React/* eslint-disable-line */, { useEffect, useState } from 'react'
import mockups from './mockups'
import styled from 'styled-components'

/**
 * @type {import('./typedef').Styles}
 */
const defaultStyles = {
  font: {
    color: 'rgba(0,0,0,40%)',
    size: '28px',
    weight: '700',
  },
  lineHeight: '180%',
  textAlign: 'center',
  transitioned: {
    font: {
      color: '#000',
    },
  },
}

/**
 *  @callback onCurrentTimeUpdate
 *  @param {number} currentTime - how long the shadow animation runs in seconds
 *  @return void
 */

/**
 *  @param {Object} opts
 *  @param {import('./typedef').Styles} [opts.styles]
 *  @param {boolean} [opts.play] - whether to play the shadow animation or not
 *  @param {number} [opts.duration] - animation duration for entire quote text. Unit is second.
 *  @param {string} [opts.className]
 *  @param {string[]} opts.textArr - quote text
 *  @param {onCurrentTimeUpdate} [opts.onCurrentTimeUpdate] -
 */
export default function QuoteShadow({
  className,
  textArr,
  duration,
  play = false,
  styles = defaultStyles,
  onCurrentTimeUpdate = () => {},
}) {
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const textLen = textArr.join('').length

  let durationPerChar = 300 // ms, default value
  if (duration) {
    durationPerChar = (duration / textLen) * 1000 // ms
  }

  useEffect(() => {
    if (currentCharIndex < textLen && play) {
      setTimeout(() => {
        const nextCharIndex = currentCharIndex + 1
        setCurrentCharIndex(nextCharIndex)
        onCurrentTimeUpdate((currentCharIndex * durationPerChar) / 1000) // in seconds
      }, durationPerChar)
    }
  })

  let charOffset = 0
  const charArrJsx = textArr.map((t) => {
    const chars = Array.from(t)
    const rtn = chars
      .map((char, cIndex) => {
        return (
          <Char
            key={`char_${cIndex}`}
            color={
              cIndex + charOffset < currentCharIndex
                ? styles.transitioned.font.color
                : styles.font.color
            }
            fontSize={styles.font.size}
            lineHeight={styles.lineHeight}
          >
            {char}
          </Char>
        )
      })
      .concat(<br key={`char_break_line`} />)
    charOffset += chars.length
    return rtn
  })

  return (
    <Container className={className}>
      <mockups.quote.LeftUpperQuoteMark />
      <Quote textAlign={styles.textAlign}>{charArrJsx}</Quote>
      <mockups.quote.RightBottomQuoteMark />
    </Container>
  )
}

const Container = styled.div`
  position: relative;

  & > svg:first-child {
    position: absolute;
    left: 0;
    top: 0;
  }

  & > svg:last-child {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`

const Char = styled.span`
  ${/**
   *  @param {Object} props
   *  @param {string} props.color
   *  @param {string} props.fontSize
   *  @param {string} props.lineHeight
   */
  (props) => {
    return `
      color: ${props.color};
      transition: color 0.5s linear; /* TODO make transition duration cofigurable*/
      font-size: ${props.fontSize};
      line-height: ${props.lineHeight}
    `
  }}
`

const Quote = styled.blockquote`
  ${/**
   *  @param {Object} props
   *  @param {string} props.textAlign
   */
  (props) => {
    return `
      text-align: ${props.textAlign};
      margin: 50px;
    `
  }}
`
