/* eslint no-console: 0 */
import DroppingText from '@readr-media/react-dropping-text'
import DualSlides from '@readr-media/react-dual-slides'
import React from 'react' // eslint-disable-line
import ReactDOMServer from 'react-dom/server'
import Feedback from '@readr-media/react-feedback'
import Karaoke from '@readr-media/react-karaoke'
import QAList from '@readr-media/react-qa-list'
import Questionnaire from '@readr-media/react-questionnaire'
import ew from '@readr-media/react-election-widgets'
import get from 'lodash/get.js'
import rlb from '@readr-media/react-live-blog'
import map from 'lodash/map'
import serialize from 'serialize-javascript'
import Video from '@readr-media/react-full-screen-video'
import RandomTextSelector from '@readr-media/react-random-text-selector'
import Theatre from '@readr-media/react-theatre'
import { ServerStyleSheet } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const _ = {
  get,
  map,
}

/**
 *  @typedef {Object} WebpackAssets
 *  @property {string[]} entrypoints - webpack bundles
 *  @property {string} version - webpack bundles version
 *
 */

/**
 *  @param {import('@readr-media/react-dropping-text').DroppingTextProps} data
 *  @param {WebpackAssets} webpackAssets
 *  @returns string
 */
export function buildDroppingTextEmbedCode(data, webpackAssets) {
  return buildEmbeddedCode('react-dropping-text', data, webpackAssets)
}

/**
 *  @param {import('@readr-media/react-dual-slides').DualSlidesProps} data
 *  @param {WebpackAssets} webpackAssets
 *  @returns string
 */
export function buildDualSlidesEmbedCode(data, webpackAssets) {
  return buildEmbeddedCode('react-dual-slides', data, webpackAssets)
}

/**
 *  @param {import('@readr-media/react-three-story-points').ThreeStoryPointsProps} data
 *  @param {WebpackAssets} webpackAssets
 *  @returns string
 */
export function buildThreeStoryPointsEmbedCode(data, webpackAssets) {
  return buildEmbeddedCode('react-three-story-points', data, webpackAssets)
}

/**
 *  @param {import('@readr-media/react-karaoke').KaraokeProps} data
 *  @param {WebpackAssets} webpackAssets
 *  @returns string
 */
export function buildKaraokeEmbedCode(data, webpackAssets) {
  return buildEmbeddedCode('react-karaoke', data, webpackAssets)
}

export function buildTheatreEmbedCode(data, webpackAssets) {
  return buildEmbeddedCode('react-theatre', data, webpackAssets)
}

/**
 *
 * @export
 * @param {('react-questionnaire'|'react-qa-list'|
 * 'react-feedback'|'react-karaoke'|'react-live-blog'|
 * 'react-election-widgets-seat-chart'|
 * 'react-election-widgets-votes-comparison'|
 * 'react-three-story-points' | 'react-full-screen-video' |
 * 'react-dual-slides' | 'react-random-text-selector' | 'react-dropping-text'| 'react-theatre')} pkgName
 * @param {Object} data - Data for react component
 * @param {Object} webpackAssets - webpack bundles and chunks
 * @param {string[]} webpackAssets.entrypoints - webpack bundles
 * @param {string} webpackAssets.version - webpack bundles version
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
  let skipServerSideRendering = false
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
    case 'react-election-widgets-seat-chart':
      Component = ew.SeatChart.ReactComponent
      break
    case 'react-election-widgets-votes-comparison':
      Component = ew.VotesComparison.ReactComponent
      break
    case 'react-full-screen-video':
      Component = Video
      break
    case 'react-dual-slides':
      Component = DualSlides
      break
    case 'react-three-story-points':
      skipServerSideRendering = true
      break
    case 'react-random-text-selector':
      Component = RandomTextSelector
      break
    case 'react-dropping-text':
      Component = DroppingText
      break
    case 'react-theatre':
      Component = Theatre
      break
    default:
      throw new Error(`pkgName ${pkgName} is not supported`)
  }

  let jsx = `<div id="${uuid}"></div>`
  let styleTags = ''

  if (!skipServerSideRendering) {
    const sheet = new ServerStyleSheet()
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
  }

  return `
    ${styleTags}
    <script>
      (function() {
        var namespace = '@readr-media';
        var pkg = '${pkgName}@${webpackAssets.version}';
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
