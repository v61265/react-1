import React from 'react' // eslint-disable-line
import { createRoot } from 'react-dom/client'
import styled from 'styled-components'

import { MirrorIcon, ShareIcon } from '../src/react-components'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

root.render(
  <Header>
    <MirrorIcon />
    <ShareIcon
      onClick={() => console.log('click share-icon')}
      LineClick={() => console.log('click Line-icon')}
      FbClick={() => console.log('click Fb-icon')}
      LinkClick={() => console.log('click Link-icon')}
    />
  </Header>
)
