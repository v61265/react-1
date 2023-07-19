import React from 'react' // eslint-disable-line
import Theatre from '../src/react-components/index.js'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const animateJson = {
  sheetsById: {
    Scene: {
      sequence: {
        type: 'PositionalSequence',
        length: 1.5,
        tracksByObject: {
          test01: {
            trackData: {
              '0J6FbeYCu6': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["zIndex"]',
              },
              '0Vi6qtdlfn': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["position","y"]',
              },
              '4mNvR1N9Xj': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["border","radius"]',
              },
              '5MV9Ih-PeK': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["content"]',
              },
              '8kkzsxIkzU': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["font","weight"]',
              },
              '9B5_PW6ESg': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["textAlign"]',
              },
              FeneXqraar: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["lineHeight"]',
              },
              JccmqJ6E5D: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["font","color"]',
              },
              ODxut07NjS: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'N-6BcAaSKY',
                    type: 'bezier',
                    value: 40,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: '8WCjWaJoOb',
                    type: 'bezier',
                    value: 60,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.2,
                    connectedRight: true,
                  },
                ],
                __debugName: 'test01:["position","x"]',
              },
              'U-1mnwGabJ': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["font","size"]',
              },
              UmzsojFGm0: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["scale"]',
              },
              'ZXq-bTu9Q8': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["visible"]',
              },
              i3dIo1A4dR: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["border","size"]',
              },
              jPGdx84fZS: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["bgColor"]',
              },
              oej3iyaqi6: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["font","spacing"]',
              },
              pk3muD4Fnf: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["padding"]',
              },
              'rFNAS-rilC': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["opacity"]',
              },
              twa1Se3r4q: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["size","width"]',
              },
              'z-yvEz9XzH': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'test01:["border","color"]',
              },
            },
            trackIdByPropPath: {
              '["scale"]': 'UmzsojFGm0',
              '["zIndex"]': '0J6FbeYCu6',
              '["bgColor"]': 'jPGdx84fZS',
              '["content"]': '5MV9Ih-PeK',
              '["opacity"]': 'rFNAS-rilC',
              '["padding"]': 'pk3muD4Fnf',
              '["visible"]': 'ZXq-bTu9Q8',
              '["textAlign"]': '9B5_PW6ESg',
              '["lineHeight"]': 'FeneXqraar',
              '["font","size"]': 'U-1mnwGabJ',
              '["font","color"]': 'JccmqJ6E5D',
              '["position","x"]': 'ODxut07NjS',
              '["position","y"]': '0Vi6qtdlfn',
              '["size","width"]': 'twa1Se3r4q',
              '["border","size"]': 'i3dIo1A4dR',
              '["font","weight"]': '8kkzsxIkzU',
              '["border","color"]': 'z-yvEz9XzH',
              '["font","spacing"]': 'oej3iyaqi6',
              '["border","radius"]': '4mNvR1N9Xj',
            },
          },
        },
        subUnitsPerUnit: 30,
      },
      staticOverrides: {
        byObject: {},
      },
    },
  },
  revisionHistory: ['eoQYCiPyGkiGLjQw'],
  definitionVersion: '0.4.0',
}

const objectJson = [
  {
    id: 'test01',
    type: 'FONT',
    content: 'test01',
  },
]

root.render(
  <Theatre animateJson={animateJson} objectJson={objectJson} type="scroll" />
)
