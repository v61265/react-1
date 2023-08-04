import React from 'react' // eslint-disable-line
import Theatre from '../src/react-components/index.js'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const objectJson = [
  {
    id: 'bg-001',
    type: 'BACKGROUND',
  },
  {
    id: 'video-001',
    src:
      'https://storage.googleapis.com/statics-readr-tw-dev/files/test-e0u6aXKDeeLbFrNXXCi.mp4',
    type: 'VIDEO',
  },
]

const animateJson = {
  sheetsById: {
    Scene: {
      sequence: {
        type: 'PositionalSequence',
        length: 4.92,
        tracksByObject: {
          'video-001': {
            trackData: {
              '1TJO24zqfC': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["position","y"]',
              },
              BOGCRkE1KC: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'HcB7LOX0Bw',
                    type: 'bezier',
                    value: 25.861111111111107,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: 'ZLw8bt8_Lx',
                    type: 'bezier',
                    value: 54.361111111111114,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.567,
                    connectedRight: true,
                  },
                ],
                __debugName: 'video-001:["position","x"]',
              },
              U9XnKttZTa: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["scale"]',
              },
              Y09ylmVMlW: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'BdnGSJETxg',
                    type: 'bezier',
                    value: false,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: 'zmxLzRsz9k',
                    type: 'bezier',
                    value: true,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.567,
                    connectedRight: true,
                  },
                ],
                __debugName: 'video-001:["isPlaying"]',
              },
              'ilZ84-Be_G': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["zIndex"]',
              },
              pp3bvV5f3j: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["visible"]',
              },
              qmMZKLVrK6: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["size","height"]',
              },
              xO8L90JVsO: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["size","width"]',
              },
            },
            trackIdByPropPath: {
              '["scale"]': 'U9XnKttZTa',
              '["zIndex"]': 'ilZ84-Be_G',
              '["visible"]': 'pp3bvV5f3j',
              '["isPlaying"]': 'Y09ylmVMlW',
              '["position","x"]': 'BOGCRkE1KC',
              '["position","y"]': '1TJO24zqfC',
              '["size","width"]': 'xO8L90JVsO',
              '["size","height"]': 'qmMZKLVrK6',
            },
          },
        },
        subUnitsPerUnit: 30,
      },
      staticOverrides: {
        byObject: {
          'bg-001': {
            url:
              'https://storage.googleapis.com/statics-readr-tw-dev/images/955e7a43-b895-4f4e-ab1b-60de852dbcf7.png',
          },
          'video-001': {
            size: {
              width: 300,
              height: 200,
            },
            scale: 1,
            zIndex: '10',
            visible: true,
            position: {
              x: 27.361111111111107,
              y: 45.1219512195122,
            },
            isPlaying: true,
          },
        },
      },
    },
  },
  revisionHistory: [],
  definitionVersion: '0.4.0',
}

root.render(
  <Theatre
    objectJson={objectJson}
    animateJson={animateJson}
    // mobileObjectJson={mobileObjectJson}
    // mobileAnimateJson={mobileAnimateJson}
    type="scroll"
    mobileSize={500}
  />
)
