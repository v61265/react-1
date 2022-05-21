import "regenerator-runtime/runtime";

import React from 'react'
import FeedbackComponent from '../src/react-components'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)
const data = window.__data

root.render(<FeedbackComponent {...data} />)
