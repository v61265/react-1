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
  > a {
    cursor: pointer;
    display: inline-block;
    height: auto;
    width: ${/**
     *  @param {Object} props
     *  @param {string} props.size
     */ (props) => (props.size ? props.size : '21px')};

    height: ${/**
     *  @param {Object} props
     *  @param {string} props.size
     */ (props) => (props.size ? props.size : '21px')};

    @media (min-width: 768px) {
      width: ${/**
       *  @param {Object} props
       *  @param {string} props.size
       */ (props) => (props.size ? props.size : '28px')};

      height: ${/**
       *  @param {Object} props
       *  @param {string} props.size
       */ (props) => (props.size ? props.size : '28px')};
    }
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
 * - toggle status.
 * - default value is `'false'`.
 * @param {string} [props.size]
 * - size of button.
 * - optional, default value is `''`.
 * @param {string} [props.direction]
 * - toggle direction.
 * - optional, default value is `'vertical'`.
 * @param {import("react").MouseEventHandler} [props.FbClick]
 * - FB-icon onClick function.
 * - optional, default value is {()=> void}.
 * @param {import("react").MouseEventHandler} [props.LineClick]
 * - Line-icon onClick function.
 * - optional, default value is {()=> void}.
 * @param {import("react").MouseEventHandler} [props.LinkClick]
 * - Link-icon onClick function.
 * - optional, default value is {()=> void}.
 * @returns {JSX.Element}
 */

export default function SocialIcon({
  show,
  size,
  direction,
  FbClick,
  LineClick,
  LinkClick,
}) {
  const [origin, setOrigin] = useState('')
  const [showAlert, setShowAlert] = useState('')

  function handleCopy() {
    navigator.clipboard.writeText(origin)
    setShowAlert('animate fadeOut')
    setTimeout(() => {
      setShowAlert('')
    }, '2500')
  }

  useEffect(() => {
    setOrigin(() => window.location.origin)
  }, [])

  function handleLinkClick() {
    handleCopy()
    LinkClick()
  }

  const iconConfigs = [
    {
      index: 1,
      icon: <FaceBookIcon />,
      link: `https://www.facebook.com/share.php?u=${origin}`,
      className: 'FB',
      click: FbClick, // design for GA-click
    },
    {
      index: 2,
      icon: <LineIcon />,
      link: `https://social-plugins.line.me/lineit/share?url=${origin}`,
      className: 'Line',
      click: LineClick, // design for GA-click
    },
    {
      index: 3,
      icon: <LinkIcon />,
      className: 'Link',
      click: handleLinkClick, // design for GA-click
    },
  ]

  const socialIcon = iconConfigs.map((cfg) => {
    let directionClassName =
      direction === 'vertical'
        ? `${cfg.className}-vertical`
        : `${cfg.className}-horizon`

    let style = show ? `show ${directionClassName}` : 'hide'

    return (
      <a
        href={cfg.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={cfg.click}
        key={cfg.index}
        className={style}
      >
        {cfg.icon}
      </a>
    )
  })

  return (
    <IconWrapper size={size}>
      {socialIcon}
      <CopyAlert showAlert={showAlert} />
    </IconWrapper>
  )
}
