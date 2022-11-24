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
    'https://editools-gcs-dev.readr.tw/files/liveblogs/ukraine-war.json'
  )

  root.render(
    <>
      <lb.ReactComponent.LiveBlog
        initialLiveblog={data}
        fetchLiveblogUrl="https://editools-gcs-dev.readr.tw/files/liveblogs/ukraine-war.json"
        fetchImageBaseUrl="https://editools-gcs-dev.readr.tw"
        toLoadPeriodically={false}
      />
    </>
  )
}
main()
