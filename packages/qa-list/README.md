# [@readr-media/react-qa-list](https://www.npmjs.com/package/@readr-media/react-qa-list) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/react-qa-list.svg?style=flat)

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

### Troubleshooting
#### Q: How do I import/require `QAList` React component only?
In `src/index.js`, it does not only export `QAList` React component, but also export `buildEmbeddedCode` and `loadWebpackAssets` functions.
In some scenarios, like we write another React component `AnotherComponent` in `another.jsx`, and we want `AnotherComponent` to render `QAList`.
We might have `import QAList from '@readr-media/react-qa-list'` in `another.jsx`.
But, there will be a webpack error if we try to webpack `another.jsx`. The reason is because `@readr-media/react-qa-list/lib/index.js` imports `path` module, and `path` module cannot be webpacked.

To solve this webpack error, we have to import the `QAList` React component directly. See the following demo codes.
```
// another.jsx

// import `QAList` React component directly
import QAList from '@readr-media/react-qa-list/lib/react-components'

const questions = [...]

function AnotherComponent() {
  return (
    <QAList questions={questions} title="你可能還想知道？">
  )
}
```


## TODOs
- [ ] 建立 CI pipeline，透過 CI 產生 npm package，並且上傳至 npm registry
- [ ] 透過 Lerna 控制 packages 之間的版號
- [ ] 加入 React lazy load，讓 webpack 可以動態載入 webpack chunks
