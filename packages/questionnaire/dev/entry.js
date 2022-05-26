import "regenerator-runtime/runtime";
import Quetionnaire from '../src/react-components'
import React from 'react'
import axios from 'axios'
import mockForm from './mock-data.json'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

root.render(<Quetionnaire form={mockForm} enableDebugViewer={true}/>)
