import React from 'react' // eslint-disable-line
import Theatre from '../src/react-components/index.js'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const objectJson = [
  {
    id: 'bgVideo-001',
    type: 'BGVIDEO',
    src:
      'https://storage.googleapis.com/statics-readr-tw-dev/files/clfcb3ebh000h11yic03ehcv6.mp4',
  },
]

const animateJson = {
  sheetsById: {
    Scene: {
      staticOverrides: {
        byObject: {
          'bgVideo-001': {
            scale: 0.7000000000000001,
            position: { x: 24.30555555555556, y: 23.940949935815148 },
            size: { width: 100, height: 100 },
            visible: true,
            zIndex: '10',
          },
        },
      },
    },
  },
  definitionVersion: '0.4.0',
  revisionHistory: [],
}

const mobileObjectJson = [
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

const mobileAnimateJson = {
  sheetsById: {
    Scene: {
      sequence: {
        type: 'PositionalSequence',
        length: 3.94,
        tracksByObject: {
          'bg-001': {
            trackData: {
              '10qf6kRJ1n': {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'Txu7WOUUTt',
                    type: 'bezier',
                    value: 0,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: 'JXIOwH9uVD',
                    type: 'bezier',
                    value: 51.31944444444444,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'm2im2m8MgC',
                    type: 'bezier',
                    value: -32.50000000000001,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["position","x"]',
              },
              '2NK63jTCBS': {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'hHZmAPsXKR',
                    type: 'bezier',
                    value: true,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'xxOMkG9pQn',
                    type: 'bezier',
                    value: true,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["visible"]',
              },
              '8bLeRD-SgN': {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'gKODAViMVD',
                    type: 'bezier',
                    value: 100,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'YjJfcSGoMh',
                    type: 'bezier',
                    value: 100,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["size","height"]',
              },
              FyizgoswdB: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'GX5ZTL8J6b',
                    type: 'bezier',
                    value: 11.21951219512195,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'qleH2Ybw19',
                    type: 'bezier',
                    value: -55.000000000000014,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["position","y"]',
              },
              JYTZSAS2sr: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'lHg4LNvoSr',
                    type: 'bezier',
                    value: 'bottom',
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'xKlmPUWNgb',
                    type: 'bezier',
                    value: 'bottom',
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["zIndex"]',
              },
              KN0KJwGSqK: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'E3JMEsNVSx',
                    type: 'bezier',
                    value: 0,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: '2Nz5Xmm0ow',
                    type: 'bezier',
                    value: 0,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["border","size"]',
              },
              ND1YUOB4V0: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'Sow-V_-7zx',
                    type: 'bezier',
                    value:
                      'https://storage.googleapis.com/statics-readr-tw-dev/images/955e7a43-b895-4f4e-ab1b-60de852dbcf7.png',
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'PFER92Od04',
                    type: 'bezier',
                    value:
                      'https://storage.googleapis.com/statics-readr-tw-dev/images/955e7a43-b895-4f4e-ab1b-60de852dbcf7.png',
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["url"]',
              },
              Qxsa5qeCmc: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'b3MvMHKQDR',
                    type: 'bezier',
                    value: 0,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'lKXByvfSsa',
                    type: 'bezier',
                    value: 0,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["border","radius"]',
              },
              Y4XK9pspFQ: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'bKn-ETT6wc',
                    type: 'bezier',
                    value: 1.6999999999999997,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'hkowaVOu2k',
                    type: 'bezier',
                    value: 1.6999999999999997,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["scale"]',
              },
              b35fL49gaY: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'OOvXHMNdvv',
                    type: 'bezier',
                    value: 100,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'Fu6ybHchIN',
                    type: 'bezier',
                    value: 100,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["size","width"]',
              },
              iaaMTSq_qa: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'K6sHx8AaBE',
                    type: 'bezier',
                    value: 1,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: 'NqHba9YvSV',
                    type: 'bezier',
                    value: 1,
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["opacity"]',
              },
              mEfWCyKKhy: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'dDXsMax_6B',
                    type: 'bezier',
                    value: {
                      a: 1,
                      b: 0,
                      g: 0,
                      r: 0,
                    },
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.6,
                    connectedRight: true,
                  },
                  {
                    id: '0FyN2-XgbP',
                    type: 'bezier',
                    value: {
                      a: 1,
                      b: 0,
                      g: 0,
                      r: 0,
                    },
                    handles: [0.5, 1, 0.5, 0],
                    position: 3.467,
                    connectedRight: true,
                  },
                ],
                __debugName: 'bg-001:["border","color"]',
              },
            },
            trackIdByPropPath: {
              '["url"]': 'ND1YUOB4V0',
              '["scale"]': 'Y4XK9pspFQ',
              '["zIndex"]': 'JYTZSAS2sr',
              '["opacity"]': 'iaaMTSq_qa',
              '["visible"]': '2NK63jTCBS',
              '["position","x"]': '10qf6kRJ1n',
              '["position","y"]': 'FyizgoswdB',
              '["size","width"]': 'b35fL49gaY',
              '["border","size"]': 'KN0KJwGSqK',
              '["size","height"]': '8bLeRD-SgN',
              '["border","color"]': 'mEfWCyKKhy',
              '["border","radius"]': 'Qxsa5qeCmc',
            },
          },
          'video-001': {
            trackData: {
              'B-l8_NSxmX': {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'YBeiIFCejJ',
                    type: 'bezier',
                    value: false,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: 'lgL46NRPlg',
                    type: 'bezier',
                    value: true,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.533,
                    connectedRight: true,
                  },
                ],
                __debugName: 'video-001:["visible"]',
              },
              'B5RL-6IEy1': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["position","x"]',
              },
              K_Jrj2rwf1: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["zIndex"]',
              },
              clZONeFXMM: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["position","y"]',
              },
              dsluahf6mW: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["scale"]',
              },
              hmVTpT1em0: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: '3Qn75JJLEt',
                    type: 'bezier',
                    value: false,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: 'O-v6DOuV73',
                    type: 'bezier',
                    value: true,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.533,
                    connectedRight: true,
                  },
                ],
                __debugName: 'video-001:["isPlaying"]',
              },
              iE1G__rZfK: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["size","height"]',
              },
              wqTR7EKYBE: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'video-001:["size","width"]',
              },
            },
            trackIdByPropPath: {
              '["scale"]': 'dsluahf6mW',
              '["zIndex"]': 'K_Jrj2rwf1',
              '["visible"]': 'B-l8_NSxmX',
              '["isPlaying"]': 'hmVTpT1em0',
              '["position","x"]': 'B5RL-6IEy1',
              '["position","y"]': 'clZONeFXMM',
              '["size","width"]': 'wqTR7EKYBE',
              '["size","height"]': 'iE1G__rZfK',
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
              x: 22.083333333333336,
              y: 45.85365853658537,
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
    mobileObjectJson={mobileObjectJson}
    mobileAnimateJson={mobileAnimateJson}
    type="scroll"
  />
)
