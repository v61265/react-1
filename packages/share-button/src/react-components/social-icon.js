import React from 'react' // eslint-disable-line
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CopyAlert from './copy-alert'

import { FaceBookIcon, LineIcon, LinkIcon } from './icon'

const IconAnimation = `
  position: absolute;
  top: 0;
  right: 0;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
`

const IconWrapper = styled.div`
  width: 100%;
  > a,
  button {
    width: 100%;
    height: auto;
    display: inline-block;
  }

  .hide {
    visibility: hidden;
    transform: translateY(140%);
    ${IconAnimation};
  }

  .show {
    visibility: visible;
    transform: translateY(140%);
    ${IconAnimation}
  }

  // vertical-style
  .FB-vertical {
    transform: translateY(140%);
  }

  .Line-vertical {
    transform: translateY(260%);
  }

  .Link-vertical {
    transform: translateY(380%);
  }

  // horizon-style
  .FB-horizon {
    transform: translateY(140%);
  }

  .Line-horizon {
    transform: translateX(-120%) translateY(140%);
  }

  .Link-horizon {
    transform: translateX(-240%) translateY(140%);
  }
`

/**
 * @param {Object} props
 * @param {boolean} [props.show]
 * @param {string} [props.direction]
 * @param {import("react").MouseEventHandler} [props.FbClick]
 * @param {import("react").MouseEventHandler} [props.LineClick]
 * @param {import("react").MouseEventHandler} [props.LinkClick]
 * @return {JSX.Element}
 */

export default function SocialIcon({
  show,
  direction,
  FbClick,
  LineClick,
  LinkClick,
}) {
  const [origin, setOrigin] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(origin)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, '2000')
  }

  useEffect(() => {
    setOrigin(() => window.location.origin)
  }, [])

  function handleLinkClick() {
    handleCopy()
    typeof LinkClick === 'function' && LinkClick()
  }

  return (
    <IconWrapper>
      <a
        href={`https://www.facebook.com/share.php?u=${origin}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={typeof FbClick === 'function' && FbClick}
        className={show ? `show FB-${direction}` : 'hide'}
        aria-label="點擊後分享此網站連結至Facebook"
      >
        <FaceBookIcon />
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${origin}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={typeof LineClick === 'function' && LineClick}
        className={show ? `show Line-${direction}` : 'hide'}
        aria-label="點擊後分享此網站連結至Line"
      >
        <LineIcon />
      </a>
      <button
        disabled={showAlert ? true : false}
        onClick={handleLinkClick}
        className={show ? `show Link-${direction}` : 'hide'}
        aria-label="點擊後複製此網站連結至剪貼簿"
      >
        <LinkIcon />
      </button>
      <CopyAlert showAlert={showAlert} />
    </IconWrapper>
  )
}
