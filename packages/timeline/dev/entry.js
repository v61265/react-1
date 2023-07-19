import 'regenerator-runtime/runtime'
import React from 'react' // eslint-disable-line
import lb from '../src'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

async function main() {
  const ldr = new lb.DataLoader()
  const data = await ldr.loadData(
    'https://storage.googleapis.com/editools-gcs-dev.readr.tw/files/liveblogs/deepfakeDev.json'
  )
  root.render(
    <>
      <lb.ReactComponent.Timeline liveblog={data} />
    </>
  )
}
main()
