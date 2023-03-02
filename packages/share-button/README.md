# [@readr-media/share-button](https://www.npmjs.com/package/@readr-media/share-button) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/share-button.svg?style=flat)

## Share-Button / 社群分享展開按鈕

## Feature

- 可傳入 `pathColor`，調整 Button 的 svg path 顏色。
- 可傳入 `direction`，調整展開方向（ 'vertical' / 'horizon' )。
- 使用預設的 className : `.readr-share-button` 調整 Button 尺寸或樣式，或傳入自訂的 className，並以該 className 進行調整。
- 可傳入 `onClick`, `FbClick`, `LineClick`, `LinkClick` ，設定按鈕點擊後所觸發的函式。( 可利用此 props 設定 GA Event )
- 備註：「已複製連結至剪貼簿」( `/src/react-components/copy-alert` ) 有設定 z-index，淡入時 z-index = 9999 ; 淡出後 z-index = -1000

![share button](./imgs/share-button.svg)

## How to Use This Pkg?

1. Install the npm [package](https://www.npmjs.com/package/@readr-media/share-button)
   `yarn add @readr-media/share-button`
2. Import component in the desired place

```
import styled from 'styled-components'
import { ShareButton } from '@readr-media/share-button'

export default function SomeComponent() {

  function handleClickButton() {
    console.log('click share-button')
  }
  function handleClickLine() {
    console.log('click Line icon')
  }
  function handleClickFB() {
    console.log('click FB icon')
  }
  function handleClickLink() {
    console.log('click Link icon')
  }

  return (
    <>
      <ShareButton
        pathColor="blue"
        direction="horizon"
        className="custom-name"
        onClick={handleClickButton}
        LineClick={handleClickLine}
        FbClick={handleClickFB}
        LinkClick={handleClickLink}
      />
    </>
  )
}
```

## Props

| 名稱      | 資料型別          | 必須 | 預設值                 | 說明                                                                                          |
| --------- | ----------------- | ---- | ---------------------- | --------------------------------------------------------------------------------------------- |
| pathColor | String            |      | ' '                    | 設定 Button svg path 顏色。                                                                   |
| direction | String            |      | `"vertical"`           | 設定 Button 展開方向。                                                                        |
| className | String            |      | `"readr-share-button"` | 自訂 className。如無傳入自訂 className，仍可透過 `.readr-share-button` 更改 LOGO 樣式或尺寸。 |
| onClick   | MouseEventHandler |      | ' '                    | 點擊 share-button 後觸發之函式。                                                              |
| FbClick   | MouseEventHandler |      | ' '                    | 點擊 FB Icon 後觸發之函式。                                                                   |
| LineClick | MouseEventHandler |      | ' '                    | 點擊 Line Icon 後觸發之函式。                                                                 |
| LinkClick | MouseEventHandler |      | ' '                    | 點擊 Link Icon 後觸發之函式。                                                                 |

## Installation

`yarn install`

## Development

```
$ yarn dev
// or
$ npm run dev
// or
$ make dev
```

## Build (Webpack Bundles and ES5 Transpiling)

```
$ yarn build
// or
$ npm run build
// or
$ make build
```

### Transpile React, ES6 Codes to ES5

```
$ make build-lib
```

### NPM Publish

After executing `Build` scripts, we will have `/lib` folders,
and then we can execute publish command,

```
npm publish
```

Note: before publish npm package, we need to bump the package version first.

## TODOs

- [ ] 建立 CI pipeline，透過 CI 產生 npm package，並且上傳至 npm registry
- [ ] 透過 Lerna 控制 packages 之間的版號
