# [@readr-media/react-dropping-text](https://www.npmjs.com/package/@readr-media/react-dropping-text) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/react-dropping-text.svg?style=flat)


## Demo
<img src="https://user-images.githubusercontent.com/3000343/235825655-c895b9ed-35dc-4e6c-a65d-7a18345ee6c9.gif">

## Usage Example
```javascript
import DroppingText from '@readr-media/react-dropping-text'
import React from 'react'
import { createRoot } from 'react-dom/client'
const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const mockTextArr = [
  'This is',
  '<span style="3em">Dropping Text</span>',
  'example',
]

root.render(
  <DroppingText
    showLoadingImg
    textArr={mockTextArr}
  />
)
```

## Create Embed Code
See [@readr-media/react-embed-code-generator](https://github.com/readr-media/react/blob/main/packages/embed-code-generator/README.md) for more information.

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

## Build (React, ES6 above Transpiling)
```
$ npm run build
// or
$ make build
```

## NPM Publish
After executing `Build` scripts, we will have `/lib` folders,
and then we can execute publish command,
```
npm publish
```

Note: before publish npm package, we need to bump the package version first. 
