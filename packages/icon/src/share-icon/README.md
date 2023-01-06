# [@readr-media/icon](https://www.npmjs.com/package/@readr-media/icon) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/react-image.svg?style=flat)

## Feature - 社群分享 LOGO

- 可依據傳入的數值調整 LOGO 寬度，高度則會依比例自動進行調整。
- 可依據傳入的數值調整 LOGO 顏色，預設值為"#ffffff"(白色）。
- 可依據傳入的數值調整 展開方向，預設值為"vertical"(向下垂直展開）。
- 可傳入 onClick Function，根據不同頁面需求設置 GA Click Event。

## How to Use This Pkg?

1. Install the npm [package](https://www.npmjs.com/package/@readr-media/icon)
   `yarn add @readr-media/icon`
2. Import component in the desired place

```
import { ShareIcon } from '@readr-media/icon'

export default function SomeComponent() {

  function ShareIconClickEvent() {
    console.log('點擊ShareIcon LOGO')
  }
  function LineClickEvent() {
    console.log('點擊Line icon')
  }
  function FbClickEvent() {
    console.log('點擊Fb icon')
  }
  function LinkClickEvent() {
    console.log('點擊Link icon')
  }

  return (
    <div>
      <ShareIcon
        width={50}
        color={blue}
        direction={'horizon'}
        onClick={ShareIconClickEvent}
        LineClick={LineClickEvent}
        FbClick={FbClickEvent}
        LinkClick={LinkClickEvent}
      />
    </div>
  )
}
```

## Props

| 名稱 | 資料型別 | 必須 | 預設值 | 說明 |
| ------------ | -------- | ---- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --- | |
| color | String | | `"#ffffff"` | LOGO 顏色 | |
| width | String | Number | | `""` | LOGO 寬度 |
| direction | String| | `"vertical"` | 展開方向，目前有 'vertical' 與 'horizon' 兩種選項。 |
| onClick | MouseEventHandler | | `""` | 點擊 LOGO 後會觸發的 Function Event |
| LineClick | MouseEventHandler | | `""` | 點擊 Line icon 後會觸發的 Function Event |
| FbClick | MouseEventHandler | | `""` | 點擊 FB icon 後會觸發的 Function Event |
| LinkClick | MouseEventHandler | | `""` | 點擊 Link icon 後會觸發的 Function Event |

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
$ npm run build
// or
$ make build
```

### Build Webpack Bundles

```
$ make build-dist
```

### Transpile React, ES6 Codes to ES5

```
$ make build-lib
```

### NPM Publish

After executing `Build` scripts, we will have `./dist` and `/lib` folders,
and then we can execute publish command,

```
npm publish
```

Note: before publish npm package, we need to bump the package version first.

## TODOs

- [ ] 建立 CI pipeline，透過 CI 產生 npm package，並且上傳至 npm registry
- [ ] 透過 Lerna 控制 packages 之間的版號
- [ ] FB/Line/Link icons 也要依據 share-icon 的大小去做等比例縮放
- [ ] 設定 Function Event 預設值
- [ ] 審核/篩選 width 填入字串不為 `px` 的狀況
