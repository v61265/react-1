import React from 'react' // eslint-disable-line
import { createRoot } from 'react-dom/client'
import { ShareButton } from '../src'
import styled from 'styled-components'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 30px;
`

const onClick = () => {
  console.log('click share-button')
}

const FbClick = () => {
  console.log('click FB-button')
}

const LineClick = () => {
  console.log('click Line-button')
}

const LinkClick = () => {
  console.log('click Link-button')
}

root.render(
  <Container>
    <ShareButton
      direction="vertical"
      FbClick={FbClick}
      LineClick={LineClick}
      LinkClick={LinkClick}
      onClick={onClick}
    />
  </Container>
)
