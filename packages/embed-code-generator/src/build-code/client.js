import 'regenerator-runtime/runtime'
import { hydrateRoot } from 'react-dom/client'

const namespace = '@readr-media'

function hydrate(namespace, pkgName, Component) {
  const dataArr = window[namespace][pkgName]
  const data = dataArr.shift()
  const { uuid, ...dataOfComponent } = data
  const container = document.getElementById(uuid)
  hydrateRoot(container, <Component {...dataOfComponent} />)
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
    hydrate(namespace, 'react-questionnaire', Feedback)
  })
}

if (window?.[namespace]['react-karaoke']) {
  import(
    /* webpackChunkName: "react-karaoke" */ '@readr-media/react-karaoke'
  ).then(({ default: Karaoke }) => {
    hydrate(namespace, 'react-questionnaire', Karaoke)
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
