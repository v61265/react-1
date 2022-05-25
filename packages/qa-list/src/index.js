import Feedback from './react-components'
import path from 'path'
import { buildEmbeddedCode } from './build-code'

export default {
  ReactComponent: Feedback,
  buildEmbeddedCode,
  loadWebpackAssets: () => {
    return require(path.resolve(__dirname, '../dist/webpack-assets.json'))
  },
}
