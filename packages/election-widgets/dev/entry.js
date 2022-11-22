import 'regenerator-runtime/runtime'
import React from 'react' // eslint-disable-line
import SeatChart from '../src/react-components/seats-chart'
import DataLoader from '../src/data-loaders/seats-chart'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

async function main() {
  const ldr = new DataLoader({
    apiUrl: 'https://whoareyou-gcs.readr.tw/elections-dev',
    version: 'v1',
  })

  const data = await ldr.loadCouncilMemberData({
    year: '2018',
    countyCode: '63000',
  })

  root.render(
    <>
      <SeatChart
        data={data}
        meta={{
          year: '2018',
          location: '台北市',
          componentTitle: '席次圖',
        }}
      />
    </>
  )
}
main()
