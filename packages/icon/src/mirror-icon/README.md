# [@readr-media/react-icon](https://www.npmjs.com/package/@readr-media/icon) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/react-image.svg?style=flat)

## Feature - MirrorMedia 鏡 LOGO

- 可依據傳入的數值調整寬度，高度則會依比例自動進行調整。
- 可依據傳入的數值調整 LOGO 顏色，預設值為"#ffffff"(白色）。
- 可傳入 onClick Function，根據不同頁面需求設置 GA Click Event。

## How to Use This Pkg?

1. Install the npm [package](https://www.npmjs.com/package/@readr-media/react-icon)
   `yarn add @readr-media/react-icon`
2. Import component in the desired place

```
import { MirrorIcon } from '@readr-media/react-icon'

export default function SomeComponent() {

  function GAClickEvent() {
     console.log('點擊MirrorMedia LOGO')
  }

  return (
    <div>
      <MirrorIcon
        width={100}
        color={red}
        onClick={GAClickEvent} />
    </div>
  )
}
```

## Props

| 名稱 | 資料型別 | 必須 | 預設值 | 說明 |
| ------------ | -------- | ---- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --- | |
| color | String | | `"#ffffff"` | LOGO 顏色 | |
| width | String | Number | | `""` | LOGO 寬度 |
| onClick | MouseEventHandler | | `""` | 點擊 LOGO 後會觸發的 Function Event |

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
