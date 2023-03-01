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

root.render(
  <Container>
    <ShareButton direction="vertical" />
  </Container>
)
