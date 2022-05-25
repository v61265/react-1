import React from 'react'
import Quetionnaire from '../src/react-components'
import { createRoot } from 'react-dom/client'
import mockForm from './mock-data'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

root.render(<Quetionnaire form={mockForm} />)
