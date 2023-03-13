import ThreeStoryPoints from '../src/react-components/index.js'
import React from 'react' // eslint-disable-line
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mocks = {
  model: {
    url: './fox.glb',
    /** @type {'glb'} */
    fileFormat: 'glb',
  },
  desktopModel: {
    url: './desktop-fox.glb',
    /** @type {'glb'} */
    fileFormat: 'glb',
  },
  pois: [
    {
      position: [5.250000000000006, 2, 94.64999999999992],
      quaternion: [0, 0, 0, 1],
      duration: 1,
      ease: 'power1',
    },
    {
      position: [5.250000000000006, 2, 94.64999999999992],
      quaternion: [
        0.13781404022661392,
        -0.008549606490375105,
        0.0011896520773825693,
        0.9904205062867044,
      ],
      duration: 1,
      ease: 'power1',
    },
    {
      position: [6.171729252683055, 2, 81.8139992526975],
      quaternion: [
        0.2292470997010353,
        -0.015288096280116497,
        0.00360111198346,
        0.9732415288011893,
      ],
      duration: 1,
      ease: 'power1',
    },
    {
      position: [8.389699286374494, 2, 62.17397356713267],
      quaternion: [
        0.2292470997010353,
        -0.015288096280116497,
        0.00360111198346,
        0.9732415288011893,
      ],
      duration: 1,
      ease: 'power1',
    },
  ],
  captions: [
    '一來到台灣我就有吃藥，但開始吃的東西更 mild，比如 B 群，但沒什麼用，不會幫你立刻睡到覺。我知道一定要藉助其他東西才會睡得著。開頭我吃褪黑激素，有的人吃 3mg 就可以睡得很深，但我吃 5mg 都沒感覺，我就吃 10mg，睡得著，但醒來好像沒睡過一樣。而且會做噩夢。',
    '這些是我來台灣後買的書，記錄了2019年的香港，有的在香港絕版了，有的變成禁書。我常常拿出來看。',
    '我本來在香港就喜歡拍照。現在看到的風景是本身不會出現在我人生中的，我就更加覺得要記錄下一些事。',
    '拍照要去想怎麼拍，怎麼構圖，要很投入這件事裡，某程度上是讓我不要用那麼多空間去煩惱自己的事。可以拍照時，我發現自己不再喝那麼多酒。',
  ],
  audios: [
    {
      urls: [
        'https://editools-dev.readr.tw/files/the-maiden-s-prayer-tempo-1-n9Mhufcmyivb4aCEXjaL.MP3',
      ],
      /** @type {'auto'|'none'|'metadata'} */
      preload: 'auto',
    },
    {
      urls: [
        'https://editools-dev.readr.tw/files/audio-example-2-gNAB2G2WizFxdJLsPEj.mp3',
      ],
      /** @type {'auto'|'none'|'metadata'} */
      preload: 'auto',
    },
  ],
}

root.render(
  <>
    <ThreeStoryPoints
      audios={mocks.audios}
      model={mocks.model}
      desktopModel={mocks.desktopModel}
      pois={mocks.pois}
      captions={mocks.captions}
    />
  </>
)
