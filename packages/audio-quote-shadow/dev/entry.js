import AudioQuoteShadow from '../src/react-components'
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
]

root.render(<AudioQuoteShadow audioUrls={mocks[0][0]} textArr={mocks[0][1]} />)
