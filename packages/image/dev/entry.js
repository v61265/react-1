import Image from '../src/react-components/index.js'
import React from 'react' // eslint-disable-line
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mocks = [
  {
    original:
      'https://storage.googleapis.com/statics-readr-tw-dev/images/20200831111932-5f4cdcc42f0f930023f79ab1.png',
    w480:
      'https://storage.googleapis.com/statics-readr-tw-dev/images/20200831111932-5f4cdcc42f0f930023f79ab1-w480.png',
    w800:
      'https://storage.googleapis.com/statics-readr-tw-dev/images/20200831111932-5f4cdcc42f0f930023f79ab1-w800.png',
    w1200: '',
    w1600:
      'https://storage.googleapis.com/statics-readr-tw-dev/images/20200831111932-5f4cdcc42f0f930023f79ab1-w1600.png',
    w2400:
      'https://storage.googleapis.com/statics-readr-tw-dev/images/20200831111932-5f4cdcc42f0f930023f79ab1-w2400.png',
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
        priority={false}
        intersectionObserverOptions={{
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }}
      ></Image>
    ))}
  </div>
)
