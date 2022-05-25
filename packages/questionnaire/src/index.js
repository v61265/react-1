import Questionnaire from './react-components'
import path from 'path'
import { buildEmbeddedCode } from './build-code'

export default {
  ReactComponent: Questionnaire,
  buildEmbeddedCode,
  loadWebpackAssets: () => {
    return require(path.resolve(__dirname, '../dist/webpack-assets.json'))
  },
}
