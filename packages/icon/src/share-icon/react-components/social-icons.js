import React from 'react' // eslint-disable-line
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  FaceBookIcon,
  LineIcon,
  LinkIcon,
} from '~/components/layout/share-components/icons'

const baseIconStyle = `
  position: absolute;
  top: 0;
  right: 0;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(45px);
  transition-duration: 0.15s;
`
const IconWrap = styled.div`
  // vertical-style
  .hideIcon-vertical {
    visibility: hidden;
    ${baseIconStyle}
    @media (max-width: 768px) {
      transform: translateY(35px);
    }
  }

  .showIcon-vertical {
    visibility: visible;
    ${baseIconStyle}
    @media (max-width: 768px) {
      transform: translateY(35px);
    }
  }

  .Line-translate-Y-vertical {
    transform: translateY(80px);
    @media (max-width: 768px) {
      transform: translateY(70px);
    }
  }

  .Link-translate-Y-vertical {
    transform: translateY(115px);
    @media (max-width: 768px) {
      transform: translateY(105px);
    }
  }

  // horizon-style
  .hideIcon-horizon {
    visibility: hidden;
    ${baseIconStyle}
    @media (max-width: 768px) {
      transform: translateY(35px);
    }
  }

  .showIcon-horizon {
    visibility: visible;
    ${baseIconStyle}
    @media (max-width: 768px) {
      transform: translateY(35px);
    }
  }

  .Line-translate-Y-horizon {
    transform: translateX(-35px) translateY(45px);
    @media (max-width: 768px) {
      transform: translateX(-35px) translateY(35px);
    }
  }

  .Link-translate-Y-horizon {
    transform: translateX(-70px) translateY(45px);
    @media (max-width: 768px) {
      transform: translateX(-70px) translateY(35px);
    }
  }
`

const SocialIcon = styled.div`
  cursor: pointer;
  display: inline-block;
`

export default function SocialIcons({
  show,
  direction,
  FbClick,
  LineClick,
  LinkClick,
}) {
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(() => window.location.origin)
  }, [])

  const iconConfigs = [
    {
      index: 1,
      icon: <FaceBookIcon />,
      link: `https://www.facebook.com/share.php?u=${origin}`,
      className: '',
      click: FbClick, // design for GA-click
    },
    {
      index: 2,
      icon: <LineIcon />,
      link: `https://social-plugins.line.me/lineit/share?url=${origin}`,
      className: 'Line-translate-Y',
      click: LineClick, // design for GA-click
    },
    {
      index: 3,
      icon: <LinkIcon />,
      link: `${origin}`,
      className: 'Link-translate-Y',
      click: LinkClick, // design for GA-click
    },
  ]

  const shareIcons = iconConfigs.map((cfg) => {
    let style

    if (show && direction === 'vertical') {
      let direction = cfg.className.concat('-vertical')
      style = `showIcon-vertical ${direction}`
    } else if (!show && direction === 'vertical') {
      style = 'hideIcon-vertical'
    }

    if (show && direction === 'horizon') {
      let direction = cfg.className.concat('-horizon')
      style = `showIcon-horizon ${direction}`
    } else if (!show && direction === 'horizon') {
      style = 'hideIcon-horizon'
    }

    return (
      <SocialIcon onClick={cfg.click} key={cfg.index} className={style}>
        <a href={cfg.link} target="_blank" rel="noopener noreferrer">
          {cfg.icon}
        </a>
      </SocialIcon>
    )
  })

  return <IconWrap>{shareIcons}</IconWrap>
}
