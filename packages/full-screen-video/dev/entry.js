import FullScreenVideo from '../src/react-components'
import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mocks = [
  {
    size: 720,
    videoUrl: './test_720.mp4',
  },
  {
    size: 960,
    videoUrl: './test_960.mp4',
  },
  {
    size: 1280,
    videoUrl: './test_1280.mp4',
  },
  {
    size: 1440,
    videoUrl: './test_1440.mp4',
  },

  {
    size: 1920,
    videoUrl: './test_1920.mp4',
  },
]

const MockContentBlock = styled.div`
  height: 100vh;
  background-color: pink;
`

root.render(
  <div>
    <MockContentBlock />
    <FullScreenVideo muteHint={true} videoUrls={mocks} isDarkMode={true} />
    <MockContentBlock />
    <FullScreenVideo muteHint={false} videoUrls={mocks} isDarkMode={false} />
  </div>
)
