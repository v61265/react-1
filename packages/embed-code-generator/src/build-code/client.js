import 'regenerator-runtime/runtime'
import { createRoot, hydrateRoot } from 'react-dom/client'

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

if (window?.[namespace]['react-qa-list']) {
  import(
    /* webpackChunkName: "react-qa-list" */ '@readr-media/react-qa-list'
  ).then(({ default: QAList }) => {
    hydrate(namespace, 'react-qa-list', QAList)
  })
}

if (window?.[namespace]['react-questionnaire']) {
  import(
    /* webpackChunkName: "react-questionnaire" */ '@readr-media/react-questionnaire'
  ).then(({ default: Questionnaire }) => {
    hydrate(namespace, 'react-questionnaire', Questionnaire)
  })
}

if (window?.[namespace]['react-feedback']) {
  import(
    /* webpackChunkName: "react-feedback" */ '@readr-media/react-feedback'
  ).then(({ default: Feedback }) => {
    hydrate(namespace, 'react-feedback', Feedback)
  })
}

if (window?.[namespace]['react-karaoke']) {
  import(
    /* webpackChunkName: "react-karaoke" */ '@readr-media/react-karaoke'
  ).then(({ default: Karaoke }) => {
    hydrate(namespace, 'react-karaoke', Karaoke)
  })
}

if (window?.[namespace]['react-full-screen-video']) {
  import(
    /* webpackChunkName: "react-full-screen-video" */ '@readr-media/react-full-screen-video'
  ).then(({ default: FullScreenVideo }) => {
    hydrate(namespace, 'react-full-screen-video', FullScreenVideo)
  })
}

if (window?.[namespace]['react-live-blog']) {
  import(
    /* webpackChunkName: "react-live-blog" */ '@readr-media/react-live-blog'
  ).then(({ default: lb }) => {
    hydrate(namespace, 'react-live-blog', lb.ReactComponent.LiveBlog)
  })
}

if (window?.[namespace]['react-election-widgets-seat-chart']) {
  import(
    /* webpackChunkName: "react-election-widgets" */ '@readr-media/react-election-widgets'
  ).then(({ default: ew }) => {
    hydrate(
      namespace,
      'react-election-widgets-seat-chart',
      ew.SeatChart.ReactComponent
    )
  })
}

if (window?.[namespace]['react-election-widgets-votes-comparison']) {
  import(
    /* webpackChunkName: "react-election-widgets" */ '@readr-media/react-election-widgets'
  ).then(({ default: ew }) => {
    hydrate(
      namespace,
      'react-election-widgets-votes-comparison',
      ew.VotesComparison.ReactComponent
    )
  })
}

if (window?.[namespace]['react-three-story-points']) {
  import(
    /* webpackChunkName: "react-three-story-points" */ '@readr-media/react-three-story-points'
  ).then(({ default: ThreeStoryPoints }) => {
    render(namespace, 'react-three-story-points', ThreeStoryPoints)
  })
}

if (window?.[namespace]['react-three-story-points']) {
  import(
    /* webpackChunkName: "react-three-story-points" */ '@readr-media/react-three-story-points'
  ).then(({ default: ThreeStoryPoints }) => {
    render(namespace, 'react-three-story-points', ThreeStoryPoints)
  })
}

if (window?.[namespace]['react-dual-slides']) {
  import(
    /* webpackChunkName: "react-dual-slides" */ '@readr-media/react-dual-slides'
  ).then(({ default: DualSlides }) => {
    render(namespace, 'react-dual-slides', DualSlides)
  })
}

if (window?.[namespace]['text-selector']) {
  import(
    /* webpackChunkName: "text-selector" */ '@readr-media/text-selector'
  ).then(({ default: TextSelector }) => {
    hydrate(namespace, 'text-selector', TextSelector)
  })
}
