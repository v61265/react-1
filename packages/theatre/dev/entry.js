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
    id: 'font-001',
    type: 'FONT',
  },
]

const animateJson = {
  sheetsById: {
    Scene: {
      sequence: {
        type: 'PositionalSequence',
        length: 1.48,
        tracksByObject: {
          'font-001': {
            trackData: {
              '1FgIC7DdoN': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["font","color"]',
              },
              '5KEQWOUjBe': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["font","size"]',
              },
              '8SUyZkWlCM': {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'CMTpMN6FHc',
                    type: 'bezier',
                    value: 40,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: '0KyrKtUmHF',
                    type: 'bezier',
                    value: 40,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.333,
                    connectedRight: true,
                  },
                ],
                __debugName: 'font-001:["position","x"]',
              },
              '9srFj7Ht0I': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["textAlign"]',
              },
              BBPzcMyCss: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["font","weight"]',
              },
              FShE_xIE45: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["lineHeight"]',
              },
              FpeDzddoP6: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["content"]',
              },
              'G4oWpuyBz-': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["font","spacing"]',
              },
              'Hj-VYjck8t': {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["size","width"]',
              },
              RuLFdFppEZ: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["visible"]',
              },
              TeL3Ue6fjw: {
                type: 'BasicKeyframedTrack',
                keyframes: [
                  {
                    id: 'gXYUKPMLVj',
                    type: 'bezier',
                    value: 1,
                    handles: [0.5, 1, 0.5, 0],
                    position: 0,
                    connectedRight: true,
                  },
                  {
                    id: 'LtqZ7ofQkx',
                    type: 'bezier',
                    value: 4.600000000000003,
                    handles: [0.5, 1, 0.5, 0],
                    position: 1.333,
                    connectedRight: true,
                  },
                ],
                __debugName: 'font-001:["scale"]',
              },
              _2_63k4RLf: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["opacity"]',
              },
              bSkMDyuitm: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["zIndex"]',
              },
              kpJaVs5Sxh: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["border","radius"]',
              },
              sH2JoXeaiE: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["position","y"]',
              },
              sKGNoc0Nqt: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["border","color"]',
              },
              sl_uZmurtk: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["bgColor"]',
              },
              vTShKGog1P: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["padding"]',
              },
              voCNzKVtiF: {
                type: 'BasicKeyframedTrack',
                keyframes: [],
                __debugName: 'font-001:["border","size"]',
              },
            },
            trackIdByPropPath: {
              '["scale"]': 'TeL3Ue6fjw',
              '["zIndex"]': 'bSkMDyuitm',
              '["bgColor"]': 'sl_uZmurtk',
              '["content"]': 'FpeDzddoP6',
              '["opacity"]': '_2_63k4RLf',
              '["padding"]': 'vTShKGog1P',
              '["visible"]': 'RuLFdFppEZ',
              '["textAlign"]': '9srFj7Ht0I',
              '["lineHeight"]': 'FShE_xIE45',
              '["font","size"]': '5KEQWOUjBe',
              '["font","color"]': '1FgIC7DdoN',
              '["position","x"]': '8SUyZkWlCM',
              '["position","y"]': 'sH2JoXeaiE',
              '["size","width"]': 'Hj-VYjck8t',
              '["border","size"]': 'voCNzKVtiF',
              '["font","weight"]': 'BBPzcMyCss',
              '["border","color"]': 'sKGNoc0Nqt',
              '["font","spacing"]': 'G4oWpuyBz-',
              '["border","radius"]': 'kpJaVs5Sxh',
            },
          },
        },
        subUnitsPerUnit: 30,
      },
      staticOverrides: {
        byObject: {
          'font-001': {
            size: {
              width: 86,
            },
            bgColor: {
              a: 1,
              b: 0.5294117647058824,
              g: 0.6588235294117647,
              r: 0.7843137254901961,
            },
            content: '文字框',
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
    mobileSize={500}
  />
)
