import ThreeStoryPoints from '../src/react-components'
import React from 'react' // eslint-disable-line
import { createRoot } from 'react-dom/client'
import cameraData from './camera-data.json'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mocks = {
  model: {
    url: './model.glb',
    /** @type {'glb'|'tileset'} */
    fileFormat: 'glb',
  },
  pois: cameraData.pois,
  captions: [],
}

root.render(
  <ThreeStoryPoints
    model={mocks.model}
    pois={mocks.pois}
    captions={mocks.captions}
  />
)
