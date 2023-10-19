import React from 'react' // eslint-disable-line
import React360 from '../src/react-components/index.js'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const hotspotsConfig = [
  {
    type: 'info',
    pitch: 0,
    yaw: 0,
    text: 'this is a hotspot',
    url: 'https://www.google.com',
  },
]

root.render(
  <React360
    imageUrl="https://v3-statics-dev.mirrormedia.mg/images/548526e4-428a-49ff-b994-719c1e833f95.jpg"
    hotspotsConfig={hotspotsConfig}
    caption="some paragraph of caption to describe 360 images"
    isFullScreenWidth={false}
  />
)
