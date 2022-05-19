import React from 'react'
import QAComponent from '../src/react-components'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)
const data = window.__data

root.render(<QAComponent {...data} />)
