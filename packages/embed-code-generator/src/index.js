import path from 'path'
import { buildEmbeddedCode } from './build-code/index.js'

export default {
  buildEmbeddedCode,
  loadWebpackAssets: () => {
    return require(path.resolve(__dirname, '../dist/webpack-assets.json'))
  },
}
