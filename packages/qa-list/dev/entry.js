import 'regenerator-runtime/runtime'

import React from 'react' // eslint-disable-line
import QAListComponent from '../src/react-components'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)
const mockData = [
  {
    id: '3',
    title: '如果我想換顏色或圖片怎麼辦？',
    content: {
      blocks: [
        {
          key: '1vntn',
          data: {},
          text: '這樣就可以換顏色',
          type: 'unstyled',
          depth: 0,
          entityRanges: [
            {
              key: 0,
              length: 2,
              offset: 0,
            },
          ],
          inlineStyleRanges: [],
        },
        {
          key: 'seq1',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '7t63d',
          data: {},
          text: ' ',
          type: 'atomic',
          depth: 0,
          entityRanges: [
            {
              key: 1,
              length: 1,
              offset: 0,
            },
          ],
          inlineStyleRanges: [],
        },
        {
          key: '9h9gj',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '2npio',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {
        '0': {
          data: {
            color: '#ED883F',
          },
          type: 'COLORTEXT',
          mutability: 'MUTABLE',
        },
        '1': {
          data: {
            id: '2',
            desc: '',
            name: 'meme',
            resized: {
              original:
                'https://storage.googleapis.com/statics-editools-dev/images/d1a0d1dc-49db-435e-b1a8-6b3bbd4e1263.jpg',
            },
            imageFile: {
              url: '/images/d1a0d1dc-49db-435e-b1a8-6b3bbd4e1263.jpg',
            },
          },
          type: 'image',
          mutability: 'IMMUTABLE',
        },
      },
    },
    createdAt: '2022-05-21T17:21:58.759Z',
    updatedAt: '2022-05-21T17:22:42.557Z',
  },
  {
    id: '2',
    title: '如果出現不良反應我可以申請理賠嗎？',
    content: {
      blocks: [
        {
          key: 'fqv7j',
          data: {},
          text:
            '每個人都不得不面對這些問題。在面對這種問題時，務必詳細考慮如果出現不良反應我可以申請理賠嗎？的各種可能。儘管如果出現不良反應我可以申請理賠嗎？看似不顯眼，卻佔據了我的腦海。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '1ljqj',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'c6lg7',
          data: {},
          text: ' ',
          type: 'atomic',
          depth: 0,
          entityRanges: [
            {
              key: 0,
              length: 1,
              offset: 0,
            },
          ],
          inlineStyleRanges: [],
        },
        {
          key: 'c36so',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {
        '0': {
          data: {
            caption: '',
            embeddedCode:
              '<iframe src="https://flo.uri.sh/visualisation/1354785/embed" title="Interactive or visual content" class="flourish-embed-iframe" frameborder="0" scrolling="no" style="width:100%;height:600px;" sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"></iframe><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Pictures non NBA fans wouldn&#39;t understand <a href="https://t.co/olm1gepLI9">pic.twitter.com/olm1gepLI9</a></p>&mdash; . (@ItsAPooleParty_) <a href="https://twitter.com/ItsAPooleParty_/status/1530762623993667584?ref_src=twsrc%5Etfw">May 29, 2022</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
          },
          type: 'EMBEDDEDCODE',
          mutability: 'IMMUTABLE',
        },
      },
    },
    createdAt: '2022-05-21T16:59:45.983Z',
    updatedAt: '2022-05-21T17:23:38.251Z',
  },
  {
    id: '1',
    title: '如果我在建議接種第二劑疫苗的時間未接種到疫苗的話，該怎麼辦？',
    content: {
      blocks: [
        {
          key: '68u8i',
          data: {},
          text:
            '指揮中心建議，接種第 2 劑AZ疫苗的時間最好是間隔 8 至 12 周，如果是 3 月 22 日施打第一劑，12 周後的時間點會落在 6 月 13 日。不過台灣感染症醫學會名譽理事長黃立民指出，國外數據顯示，間隔12到16周打第二劑，其實和間隔10到12周的效果差不多，但因為國外幾乎沒有，建議最晚就是間隔 16 周。因此，在 7 月 11 日前打第二劑都還行。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '9852u',
          data: {},
          text: '無症狀或症狀緩解',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '7erf7',
          data: {},
          text: '符合下列其中一項',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'c62qd',
          data: {},
          text: '兩次快篩結果為陰性（若距發病/採檢確診日已隔 5 天則快篩一次）',
          type: 'unordered-list-item',
          depth: 1,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '1hsrs',
          data: {},
          text: '距離發病日或採檢日滿 7 天',
          type: 'unordered-list-item',
          depth: 1,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    createdAt: '2022-05-21T10:33:11.336Z',
    updatedAt: '2022-05-21T17:28:07.255Z',
  },
]

root.render(<QAListComponent questions={mockData} />)
