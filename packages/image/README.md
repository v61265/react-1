# [@readr-media/react-image](https://www.npmjs.com/package/@readr-media/react-image) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/react-image.svg?style=flat)




## Feature

- 可傳入的多個圖片URL，並依序載入。
- 可選擇兩種載入模式，決定首次載入的圖片尺寸：
  - `auto`: 可由元件判定裝置螢幕寬度，自動載入最適合的尺寸的圖片。
  - `manual`：可傳入參數`loadResolution`，由使用者自行決定欲載入的圖片尺寸。
- 當特定圖片載入成功時，則顯示該圖片；當特定圖片載入失敗時，則載入更大尺寸的圖片。
- 當所有圖片URL皆載入失敗時，載入預設圖片。
- 實作圖片載入動畫效果。
- 實作圖片懶載入（lazy load）。

## How to Use This Pkg as React Component ?
1. Install the npm [package](https://www.npmjs.com/package/@readr-media/react-image)
`yarn add @readr-media/react-image`
2. Import component in the desired place

```
import CustomImage from '@readr-media/react-image'
const IMAGES_URL = { w480: "480.png", w800: "w800.png", original: "original.png"}
export default function SomeComponent() {
  return (
    <div>
      <OtherComponent/>
      
      {/* If `loadMode` is auto, `CustomImage` will determine which size of image should load first based on screen width, so different URL of image will load on different screen width. */}
      <CustomImage images={IMAGES_URL} loadMode="auto"/>
      
      {/* If `loadMode` is manual, `CustomImage` will determine which size of image should load first based on `loadResolution`. In here, "w800.png" will loaded first regardless of screen width*/}
      <CustomImage images={IMAGES_URL} loadMode="manual" loadResolution="w800"/>

    </div>
  )
}
```




## Props 

| 名稱         | 資料型別 | 必須 | 預設值           | 說明                                                                                                                                                                                                                                                    |
| ------------ | -------- | ---- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| images       | Object   | `V`  | `{original: ""}` | 圖片設定，範例： `{ w400: '400.png',w800 : '800.png', w1200: '1200.png', original: 'original.png' }`。會由`w400`、`w800`、`w1200`、`original`依序載入                                                                                                   |
| defaultImage | String   |      | `""`             | 預設圖片。當`image`皆載入失敗時，則載入預設圖片。<br>當`loadingImage`未傳入時，則以預設圖片作為圖片載入動畫效果。                                                                                                                                       |
| loadingImage | String   |      | `""`             | 載入動畫效果，作為載入圖片的動畫。目前僅接受圖片檔URL。                                                                                                                                                                                                 |
| alt          | String   |      | `""`             | 替代文字                                                                                                                                                                                                                                                |
| objectFit    | String   |      | `"cover"`        | 圖片區塊填滿設定，即為CSS property `object-fit`                                                                                                                                                                                                         |
| height       | String   |      | `"100%"`         | 圖片高度                                                                                                                                                                                                                                                |
| width        | String   |      | `"100%"`         | 圖片寬度                                                                                                                                                                                                                                                |
| loadMode     | String   |      | `"auto"`         | 圖片載入模式，若傳入`"auto"`，則會依據螢幕寬度載入最適合大小的圖片；若傳入`"manual"`，則會依據另一參數`"loadResolution"`，載入指定尺寸的圖片。若loadMode為manual，但`"loadResolution"`為falsy值或不存在參數images屬性的任一件鍵值，則從最小尺寸圖片載入。 |
| loadResolution|String|      |`"original"`|圖片載入尺寸，只有在另一參數`loadMode`為`"manual"`時才有效。|
| debugMode    | Boolean  |      | `false`          | 是否開啟開發模式，若開啟，則在載入圖片成功或失敗時，透過`console.log`顯示相關訊息                                                                                                                                                                       |







## Precautions
若使用該套件時，禁用了瀏覽器的cache，則同張圖片會載入至少兩次（一次在函式`loadImage()`中載入各個大小的圖片，一次則在useEffect中，將成功載入的圖片掛載至`<img>`上），這是正常的現象。
之所以要分載入兩次，而不是在`loadImage()`中嘗試載入圖片並掛載至`<img>`，是因為這樣才能在圖片載入時顯示`loadingImage`。

若無禁用瀏覽器快取，則僅會載入一次圖片。

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
- [ ] 在禁用瀏覽器的快取情況下，仍僅需載入圖片一次。
