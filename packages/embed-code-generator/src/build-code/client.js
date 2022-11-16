import 'regenerator-runtime/runtime'
import Feedback from '@readr-media/react-feedback/lib/react-components'
import Questionnaire from '@readr-media/react-questionnaire/lib/react-components'
import QAList from '@readr-media/react-qa-list/lib/react-components'
import Karaoke from '@readr-media/react-karaoke/lib/react-components'
import LiveBlog from '@readr-media/react-live-blog/lib/react-components'
import React from 'react' // eslint-disable-line
import { hydrateRoot } from 'react-dom/client'

const namespace = '@readr-media'
const pkgComponentArr = [
  {
    name: 'react-feedback',
    Component: Feedback,
  },
  {
    name: 'react-questionnaire',
    Component: Questionnaire,
  },
  {
    name: 'react-qa-list',
    Component: QAList,
  },
  {
    name: 'react-karaoke',
    Component: Karaoke,
  },
  {
    name: 'react-live-blog',
    Component: LiveBlog,
  },
]

for (const pc of pkgComponentArr) {
  const dataArr = window?.[namespace]?.[pc.name]

  if (Array.isArray(dataArr) && dataArr.length > 0) {
    // select first data to render and
    // removes it from data array
    const data = dataArr.shift()
    const { uuid, ...dataOfComponent } = data
    const container = document.getElementById(uuid)
    hydrateRoot(container, <pc.Component {...dataOfComponent} />)
  }
}
