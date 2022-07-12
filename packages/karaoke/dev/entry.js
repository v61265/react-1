import Karaoke from '../src/react-components'
import React, {useState} from 'react' // eslint-disable-line
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mocks = [
  [
    ['./audio-example-1.mp3'],
    [
      '我很確定我一回去就會被關，大概會關十幾年。',
      '但是…雖然這樣子，我想可以死在香港，',
      '對…我覺得，我要死在我的故鄉，',
      '對，所以就這樣子啦，',
      '不是台灣有什麼好與不好的問題，',
      '是我忘記不了香港。',
    ],
  ],
  [
    ['./audio-example-2.mp3'],
    [
      '我在這邊已經兩年多，我本來有的東西愈來愈失去了。',
      '首先是我相信過的一些香港手足，都無法再相信。',
      '然後我的未來，本來就不能掌握，就見一步走一步，',
      '就算了，我連我的夢想都不敢想。',
    ],
  ],
  [
    ['./audio-example-3.mp3'],
    [
      '我在想，如果我有一個讓我愛的國家，會是什麼感覺？',
      '我想過會不會是台灣？但現在我覺得很困難。',
    ],
  ],
]

root.render(
  <div>
    <div style={{ height: '100vh', backgroundColor: 'pink' }} />
    <Karaoke audioUrls={mocks[0][0]} textArr={mocks[0][1]} />
    <Karaoke audioUrls={mocks[1][0]} textArr={mocks[1][1]} />
    <Karaoke audioUrls={mocks[2][0]} textArr={mocks[2][1]} />
  </div>
)
