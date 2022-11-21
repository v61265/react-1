/* eslint no-console: 0 */
import React from 'react' // eslint-disable-line
import ReactDOMServer from 'react-dom/server'
import Feedback from '@readr-media/react-feedback'
import Karaoke from '@readr-media/react-karaoke'
import QAList from '@readr-media/react-qa-list'
import Questionnaire from '@readr-media/react-questionnaire'
import get from 'lodash/get'
import rlb from '@readr-media/react-live-blog'
import map from 'lodash/map'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const _ = {
  get,
  map,
}

/**
 *
 * @export
 * @param {('react-questionnaire'|'react-qa-list'|'react-feedback'|'react-karaoke'|'react-live-blog')} pkgName
 * @param {Object} data - Data for @readr-media/react-(qa|qa-list|feedback) react component
 * @param {Object} webpackAssets - webpack bundles and chunks
 * @param {string[]} webpackAssets.entrypoints - webpack bundles
 * @returns {string} embedded code
 */
export function buildEmbeddedCode(pkgName, data, webpackAssets) {
  // use uuid to avoid duplication id
  const uuid = uuidv4()
  const dataWithUuid = {
    ...data,
    uuid,
  }

  const { entrypoints: bundles } = webpackAssets

  let Component = null
  switch (pkgName) {
    case 'react-feedback':
      Component = Feedback
      break
    case 'react-questionnaire':
      Component = Questionnaire
      break
    case 'react-qa-list':
      Component = QAList
      break
    case 'react-karaoke':
      Component = Karaoke
      break
    case 'react-live-blog':
      Component = rlb.ReactComponent.LiveBlog
      break
    default:
      throw new Error(`pkgName ${pkgName} is not supported`)
  }

  const sheet = new ServerStyleSheet()
  let jsx = ''
  let styleTags = ''
  try {
    jsx = ReactDOMServer.renderToStaticMarkup(
      sheet.collectStyles(
        <div id={uuid}>
          <Component {...data} />
        </div>
      )
    )
    styleTags = sheet.getStyleTags()
  } catch (err) {
    throw err
  } finally {
    sheet.seal()
  }

  return `
    ${styleTags}
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
    ${jsx}
    ${_.map(bundles, (bundle) => {
      return `<script type="text/javascript" defer crossorigin src="${bundle}"></script>`
    }).join('')}
  `
}
