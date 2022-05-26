import "regenerator-runtime/runtime";
import FeedbackComponent from '@readr-media/react-feedback/lib/react-components'
import QuestionnaireComponent from '@readr-media/react-questionnaire/lib/react-components'
import QAListComponent from '@readr-media/react-qa-list/lib/react-components'
import React from 'react'
import { createRoot } from 'react-dom/client'

const namespace = '@readr-media'
const pkgComponentArr = [
  {
    name: 'react-feedback',
    Component: FeedbackComponent,
  },
  {
    name: 'react-questionnaire',
    Component: QuestionnaireComponent,
  },
  {
    name: 'react-qa-list',
    Component: QAListComponent,
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
    const root = createRoot(container)
    root.render(<pc.Component {...dataOfComponent} />)
  }
}
