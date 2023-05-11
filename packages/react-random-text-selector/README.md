# [@readr-media/react-random-text-selector](https://www.npmjs.com/package/@readr-media/react-random-text-selector) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/react-karaoke.svg?style=flat)

## Demo

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGYxZDVhNTg4MGZiNGYyNzNkYjFkYTE3MWVjNWI0OWZlNTJiMjIzNiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/9tTnoUfyc6Squc9T8a/giphy.gif)

## Usage Example

```javascript
import ReactRandomTextSelector from '@readr-media/react-random-text-selector'
import React from 'react'
import styled from 'styled-components'
import { createRoot } from 'react-dom/client'
const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const jsonUrls = [
  'https://editools-gcs.readr.tw/psycho/file_1.json',
  'https://editools-gcs.readr.tw/psycho/file_2.json',
  'https://editools-gcs.readr.tw/psycho/file_3.json',
  'https://editools-gcs.readr.tw/psycho/file_4.json',
  'https://editools-gcs.readr.tw/psycho/file_5.json',
]

root.render(
  <ReactRandomTextSelector
    className="random-text-selector"
    isDebugMode={true}
    jsonUrls={jsonUrls}
    backgroundColor="#000000"
    circleUrl="https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle.png"
    buttonBackground="https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/button-background.png"
    circleUrlMobile="https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle-mobile.png"
    buttonWording="其他案例"
    loadingImgSrc="https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/loading.gif"
  />
)
```

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

After executing `Build` scripts, we will have `/lib` folders,
and then we can execute publish command,

```
npm publish
```

Note: before publish npm package, we need to bump the package version first.
