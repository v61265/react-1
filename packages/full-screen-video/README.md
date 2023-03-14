# [@readr-media/react-full-screen-video](https://www.npmjs.com/package/@readr-media/react-full-screen-video) &middot; ![npm version](https://img.shields.io/npm/v/@readr-media/react-karaoke.svg?style=flat)

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
