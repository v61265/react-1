import 'regenerator-runtime/runtime'
import React from 'react' // eslint-disable-line
import LiveBlog from '../src/react-components'
import { createRoot } from 'react-dom/client'
import mockData from './mocks/ukrain-war.json'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

async function main() {
  root.render(
    <>
      <LiveBlog
        initialLiveblog={mockData}
        fetchLiveblogUrl="https://editools-gcs-dev.readr.tw/files/liveblogs/ukraine-war.json"
        fetchImageBaseUrl="https://editools-gcs-dev.readr.tw"
        toLoadPeriodically={false}
      />
    </>
  )
}
main()
