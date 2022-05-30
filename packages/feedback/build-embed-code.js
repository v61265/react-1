const buildEmbeddedCode = require('./lib/build-code/index').buildEmbeddedCode
const webpackAssets = require('./dist/webpack-assets.json')

console.log(buildEmbeddedCode(null, webpackAssets))
