import 'regenerator-runtime/runtime'

import React from 'react' // eslint-disable-line
import FeedbackComponent from '../src/react-components'
import { createRoot } from 'react-dom/client'
import { formsData } from './mock-forms'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)


root.render(<FeedbackComponent {...formsData} />)
