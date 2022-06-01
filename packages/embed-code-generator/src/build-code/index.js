/* eslint no-console: 0 */
import get from 'lodash/get'
import map from 'lodash/map'
import serialize from 'serialize-javascript'
import { v4 as uuidv4 } from 'uuid'

const _ = {
  get,
  map,
}

/**
 *
 * @export
 * @param {('react-questionnaire'|'react-qa-list'|'react-feedback')} pkgName
 * @param {Object} data - Data for @readr-media/react-(qa|qa-list|feedback) react component
 * @param {Object} webpackAssets - webpack bundles and chunks
 * @param {string[]} webpackAssets.chunks - webpack common chunks
 * @param {string[]} webpackAssets.bundles - webpack bundles
 * @returns {string} embedded code
 */
export function buildEmbeddedCode(pkgName, data, webpackAssets) {
  // use uuid to avoid duplication id
  const uuid = uuidv4()
  const dataWithUuid = {
    ...data,
    uuid,
  }

  const { chunks, bundles } = webpackAssets

  return `
    <script>
      (function() {
        var namespace = '@readr-media';
        var pkg = '${pkgName}';
        if (typeof window != 'undefined') {
          if (!window.hasOwnProperty(namespace)) {
            window[namespace] = {};
          }
          if (window[namespace] && !window[namespace].hasOwnProperty(pkg)) {
            window[namespace][pkg] = [];
          }
          if (Array.isArray(window[namespace][pkg])) {
            var data = ${serialize(dataWithUuid)};
            window[namespace][pkg].push(data);
          }
        }
      })()
    </script>
    <div id="${uuid}"></div>
    ${_.map(chunks, (chunk) => {
      return `<script type="text/javascript" defer crossorigin src="${chunk}"></script>`
    }).join('')}
    ${_.map(bundles, (bundle) => {
      return `<script type="text/javascript" defer crossorigin src="${bundle}"></script>`
    }).join('')}
  `
}
