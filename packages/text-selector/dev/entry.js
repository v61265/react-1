import TextSelector from '../src/react-components'
import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const MockContentBlock = styled.div`
  height: 100vh;
  background-color: pink;
  margin: 0 auto;
`

const TestWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

root.render(
  <TestWrapper>
    <MockContentBlock />
    <TextSelector isDebugMode={true} />
    <MockContentBlock />
  </TestWrapper>
)
