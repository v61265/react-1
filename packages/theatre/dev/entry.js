import React from 'react' // eslint-disable-line
import Theatre from '../src/react-components/index.js'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mobileAnimateJson = {
  sheetsById: {
    Scene: {
      staticOverrides: {
        byObject: {
          'font-001': {
            size: { width: 182 },
            position: { x: 37 },
            bgColor: {
              r: 0.45098039215686275,
              g: 0.5215686274509804,
              b: 0.7764705882352941,
              a: 1,
            },
          },
        },
      },
      sequence: {
        subUnitsPerUnit: 30,
        length: 1.34,
        type: 'PositionalSequence',
        tracksByObject: {
          'font-001': {
            trackData: {
              CvAPIaCks7: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["position","x"]',
                keyframes: [
                  {
                    id: 'qy-17uSc1g',
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: 37,
                  },
                  {
                    id: '7pcnB8G32e',
                    position: 1.133,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: 16,
                  },
                ],
              },
              'IeM-zYZDOT': {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["position","y"]',
                keyframes: [],
              },
              KCcwrP1UKw: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["size","width"]',
                keyframes: [],
              },
              FOPDqrPMG5: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["bgColor"]',
                keyframes: [],
              },
              wd_Q29lutI: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["font","size"]',
                keyframes: [],
              },
              ZTT0NbB0O4: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["font","color"]',
                keyframes: [],
              },
              cpxBDDoI_M: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["font","weight"]',
                keyframes: [],
              },
              FLtzAEAt_5: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["font","spacing"]',
                keyframes: [],
              },
              aa6HWeUS4g: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["border","size"]',
                keyframes: [],
              },
              eG3QW6pZZL: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["border","color"]',
                keyframes: [],
              },
              '7fIA7dogIp': {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["border","radius"]',
                keyframes: [],
              },
              '1tITslPg4I': {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["content"]',
                keyframes: [
                  {
                    id: 'mItm8AB1do',
                    position: 0.867,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value:
                      '長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文長文',
                  },
                ],
              },
              'DQ-fJwdtHx': {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["opacity"]',
                keyframes: [],
              },
              S4qOjwj_yz: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["padding"]',
                keyframes: [],
              },
              m7mQb6aslC: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["visible"]',
                keyframes: [],
              },
              _OxsUAs9Ff: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["zIndex"]',
                keyframes: [],
              },
              o3RjWu4nUi: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["lineHeight"]',
                keyframes: [],
              },
              mKshZWHa9x: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["textAlign"]',
                keyframes: [],
              },
              hDO6rppveb: {
                type: 'BasicKeyframedTrack',
                __debugName: 'font-001:["scale"]',
                keyframes: [],
              },
            },
            trackIdByPropPath: {
              '["position","x"]': 'CvAPIaCks7',
              '["position","y"]': 'IeM-zYZDOT',
              '["size","width"]': 'KCcwrP1UKw',
              '["bgColor"]': 'FOPDqrPMG5',
              '["font","size"]': 'wd_Q29lutI',
              '["font","color"]': 'ZTT0NbB0O4',
              '["font","weight"]': 'cpxBDDoI_M',
              '["font","spacing"]': 'FLtzAEAt_5',
              '["border","size"]': 'aa6HWeUS4g',
              '["border","color"]': 'eG3QW6pZZL',
              '["border","radius"]': '7fIA7dogIp',
              '["content"]': '1tITslPg4I',
              '["opacity"]': 'DQ-fJwdtHx',
              '["padding"]': 'S4qOjwj_yz',
              '["visible"]': 'm7mQb6aslC',
              '["zIndex"]': '_OxsUAs9Ff',
              '["lineHeight"]': 'o3RjWu4nUi',
              '["textAlign"]': 'mKshZWHa9x',
              '["scale"]': 'hDO6rppveb',
            },
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
    id: 'font-001',
    type: 'FONT',
  },
]

const objectJson = [
  {
    id: 'video-001',
    type: 'VIDEO',
    src:
      'https://storage.googleapis.com/statics-readr-tw-dev/files/2022-bird-a-new720-TSyc3bqmDSaVsk5sql.mp4',
  },
  {
    id: 'video-002',
    type: 'VIDEO',
    src:
      'https://storage.googleapis.com/statics-readr-tw-dev/files/test-e0u6aXKDeeLbFrNXXCi.mp4',
  },
  { id: 'bg-001', type: 'BACKGROUND' },
]

const animateJson = {
  sheetsById: {
    Scene: {
      staticOverrides: {
        byObject: {
          'video-001': {
            position: { x: 23.16901408450704, y: 33.050847457627114 },
            size: { width: 235.5, height: 358.5 },
            visible: true,
            isPlaying: true,
            scale: 1,
            zIndex: '10',
          },
          'video-002': {
            position: { x: 47.67605633802817, y: 38.27683615819209 },
            size: { width: 300, height: 200 },
            visible: true,
            isPlaying: true,
            scale: 1,
            zIndex: '10',
          },
          'video-003': {
            position: { x: 41.40845070422535, y: 44.77401129943503 },
            size: { width: 300, height: 200 },
            visible: true,
            isPlaying: true,
            scale: 1,
            zIndex: '10',
          },
          'img-005': {
            position: { x: 28.943661971830988, y: 18.36158192090395 },
            size: { width: 300 },
            border: { size: 0, color: { r: 0, g: 0, b: 0, a: 1 }, radius: 0 },
            url: '/default-image.png',
            opacity: 1,
            visible: true,
            scale: 1,
            zIndex: '10',
          },
          'img-004': {
            position: { x: 17.464788732394368, y: 43.079096045197744 },
            size: { width: 300 },
            border: { size: 0, color: { r: 0, g: 0, b: 0, a: 1 }, radius: 0 },
            url: '/default-image.png',
            opacity: 1,
            visible: true,
            scale: 1,
            zIndex: '10',
          },
          'img-003': {
            position: { x: 32.605633802816904, y: 54.943502824858754 },
            size: { width: 300 },
            border: { size: 0, color: { r: 0, g: 0, b: 0, a: 1 }, radius: 0 },
            url: '/default-image.png',
            opacity: 1,
            visible: true,
            scale: 1,
            zIndex: '10',
          },
          'bg-001': {
            url:
              'https://storage.googleapis.com/statics-readr-tw-dev/images/955e7a43-b895-4f4e-ab1b-60de852dbcf7.png',
          },
          'img-002': {
            position: { x: 50, y: 50.1219512195122 },
            size: { width: 300 },
            border: { size: 0, color: { r: 0, g: 0, b: 0, a: 1 }, radius: 0 },
            url: '/default-image.png',
            opacity: 1,
            visible: true,
            scale: 1,
            zIndex: '10',
          },
        },
      },
      sequence: {
        subUnitsPerUnit: 30,
        length: 10,
        type: 'PositionalSequence',
        tracksByObject: {
          'video-001': {
            trackData: {
              '2njw7D1D3j': {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["position","x"]',
                keyframes: [
                  {
                    id: 'juTvtjQzyx',
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: 23.16901408450704,
                  },
                  {
                    id: '0pT1l50zxo',
                    position: 1.733,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: 71.66901408450704,
                  },
                ],
              },
              kE4ADLGDxy: {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["position","y"]',
                keyframes: [],
              },
              hmKBepCPAS: {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["size","width"]',
                keyframes: [],
              },
              'uBkMVa-k4O': {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["size","height"]',
                keyframes: [],
              },
              NhOwXGsx_n: {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["visible"]',
                keyframes: [],
              },
              '3W_n5jP6YB': {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["isPlaying"]',
                keyframes: [
                  {
                    id: 'k_2V0oeIue',
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: false,
                  },
                  {
                    id: 'LUX_FGJYhv',
                    position: 1.733,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: true,
                  },
                ],
              },
              FWcO1KTEVh: {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["scale"]',
                keyframes: [],
              },
              hyX56yucXW: {
                type: 'BasicKeyframedTrack',
                __debugName: 'video-001:["zIndex"]',
                keyframes: [],
              },
            },
            trackIdByPropPath: {
              '["position","x"]': '2njw7D1D3j',
              '["position","y"]': 'kE4ADLGDxy',
              '["size","width"]': 'hmKBepCPAS',
              '["size","height"]': 'uBkMVa-k4O',
              '["visible"]': 'NhOwXGsx_n',
              '["isPlaying"]': '3W_n5jP6YB',
              '["scale"]': 'FWcO1KTEVh',
              '["zIndex"]': 'hyX56yucXW',
            },
          },
        },
      },
    },
  },
  definitionVersion: '0.4.0',
  revisionHistory: [],
}

root.render(
  <Theatre
    objectJson={objectJson}
    animateJson={animateJson}
    mobileObjectJson={mobileObjectJson}
    mobileAnimateJson={mobileAnimateJson}
    type="scroll"
    mobileSize={500}
  />
)
