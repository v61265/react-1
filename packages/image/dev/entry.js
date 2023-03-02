import Image from '../src/react-components'
import React from 'react' // eslint-disable-line
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mocks = [
  {
    w480:
      'https://dev.readr.tw/assets/images/cl8slvqpc000710ysgvdm4vsd-tiny.png',
    w800:
      'https://dev.readr.tw/assets/images/cl8slvqpc000710ysgvdm4vsd-mobile.png',
    w1200: '',
    w1600:
      'https://dev.readr.tw/assets/images/cl8slvqpc000710ysgvdm4vsd-mobile.png',
    w2400:
      'https://dev.readr.tw/assets/images/cl8slvqpc000710ysgvdm4vsd-desktop.png',
    original:
      'https://dev.readr.tw/assets/images/cl8slvqpc000710ysgvdm4vsd.png',
  },
]

root.render(
  <div>
    <div style={{ height: '150vh', width: '100%', backgroundColor: 'pink' }}>
      <p>這是一個高度150vh的區塊。</p>
      <p>
        區塊下方是圖片，當圖片進入可視區域(viewport)時，會執行圖片懶載入(lazy
        load)
      </p>
    </div>
    {mocks.map((item, index) => (
      <Image
        key={index}
        images={item}
        defaultImage="post.svg"
        loadingImage="./loading.gif"
        alt="圖片"
        width="100%"
        height="100%"
        objectFit="cover"
        debugMode={true}
        loadMode="manual"
        loadResolution="w800"
      ></Image>
    ))}
  </div>
)
