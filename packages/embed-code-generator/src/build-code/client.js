import 'regenerator-runtime/runtime'
import { createRoot, hydrateRoot } from 'react-dom/client'

const pkgVersion = process.env.EMBED_CODE_GENERATOR_VERSION
  ? `@${process.env.EMBED_CODE_GENERATOR_VERSION}`
  : ''
const namespace = '@readr-media'

function hydrate(namespace, pkgName, Component) {
  const dataArr = window[namespace][pkgName]
  const data = Array.isArray(dataArr) ? dataArr.shift() : {}
  const { uuid, ...dataOfComponent } = data
  const container = document.getElementById(uuid)
  hydrateRoot(container, <Component {...dataOfComponent} />)
}

function render(namespace, pkgName, Component) {
  const dataArr = window[namespace][pkgName]
  const data = Array.isArray(dataArr) ? dataArr.shift() : {}
  const { uuid, ...dataOfComponent } = data
  const container = document.getElementById(uuid)
  const root = createRoot(container)
  root.render(<Component {...dataOfComponent} />)
}

if (window?.[namespace][`react-qa-list${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-qa-list" */ '@readr-media/react-qa-list'
  ).then(({ default: QAList }) => {
    hydrate(namespace, `react-qa-list${pkgVersion}`, QAList)
  })
}

if (window?.[namespace][`react-questionnaire${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-questionnaire" */ '@readr-media/react-questionnaire'
  ).then(({ default: Questionnaire }) => {
    hydrate(namespace, `react-questionnaire${pkgVersion}`, Questionnaire)
  })
}

if (window?.[namespace][`react-feedback${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-feedback" */ '@readr-media/react-feedback'
  ).then(({ default: Feedback }) => {
    hydrate(namespace, `react-feedback${pkgVersion}`, Feedback)
  })
}

if (window?.[namespace][`react-karaoke${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-karaoke" */ '@readr-media/react-karaoke'
  ).then(({ default: Karaoke }) => {
    hydrate(namespace, `react-karaoke${pkgVersion}`, Karaoke)
  })
}

if (window?.[namespace][`react-full-screen-video${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-full-screen-video" */ '@readr-media/react-full-screen-video'
  ).then(({ default: FullScreenVideo }) => {
    hydrate(namespace, `react-full-screen-video${pkgVersion}`, FullScreenVideo)
  })
}

if (window?.[namespace][`react-live-blog${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-live-blog" */ '@readr-media/react-live-blog'
  ).then(({ default: lb }) => {
    hydrate(
      namespace,
      `react-live-blog${pkgVersion}`,
      lb.ReactComponent.LiveBlog
    )
  })
}

if (window?.[namespace][`react-election-widgets-seat-chart${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-election-widgets" */ '@readr-media/react-election-widgets'
  ).then(({ default: ew }) => {
    hydrate(
      namespace,
      `react-election-widgets-seat-chart${pkgVersion}`,
      ew.SeatChart.ReactComponent
    )
  })
}

if (
  window?.[namespace][`react-election-widgets-votes-comparison${pkgVersion}`]
) {
  import(
    /* webpackChunkName: "react-election-widgets" */ '@readr-media/react-election-widgets'
  ).then(({ default: ew }) => {
    hydrate(
      namespace,
      `react-election-widgets-votes-comparison${pkgVersion}`,
      ew.VotesComparison.ReactComponent
    )
  })
}

if (window?.[namespace][`react-three-story-points${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-three-story-points" */ '@readr-media/react-three-story-points'
  ).then(({ default: ThreeStoryPoints }) => {
    render(namespace, `react-three-story-points${pkgVersion}`, ThreeStoryPoints)
  })
}

if (window?.[namespace][`react-dual-slides${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-dual-slides" */ '@readr-media/react-dual-slides'
  ).then(({ default: DualSlides }) => {
    hydrate(namespace, `react-dual-slides${pkgVersion}`, DualSlides)
  })
}

if (window?.[namespace][`react-random-text-selector${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-random-text-selector" */ '@readr-media/react-random-text-selector'
  ).then(({ default: TextSelector }) => {
    hydrate(namespace, `react-random-text-selector${pkgVersion}`, TextSelector)
  })
}

if (window?.[namespace][`react-dropping-text${pkgVersion}`]) {
  import(
    /* webpackChunkName: "react-dropping-text" */ '@readr-media/react-dropping-text'
  ).then(({ default: DroppingText }) => {
    hydrate(namespace, `react-dropping-text${pkgVersion}`, DroppingText)
  })
}
