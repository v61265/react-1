import 'regenerator-runtime/runtime'
import React from 'react' // eslint-disable-line
import EVC from '../src/react-components'
import DataLoader from '../src/data-loaders'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

//const mockData = {
//  districts: [
//    {
//      type: 'normal',
//      districtName: '01',
//      candidates: [
//        {
//          number: 1,
//          name: {
//            label: '王芝安',
//            href: 'https://readr.tw',
//            imgSrc: './candidate-1.jpg',
//          },
//          party: {
//            label: '中國國家社會主義勞工黨',
//            href: 'https://readr.tw',
//          },
//          votes: 70231,
//          voteRate: 8.45,
//          elected: false,
//        },
//        {
//          number: 2,
//          name: {
//            label: '王芝安',
//            href: 'https://readr.tw',
//            imgSrc: './candidate-2.jpg',
//          },
//          party: {
//            label: '民主進步黨',
//            href: 'https://readr.tw',
//          },
//          votes: 8170231,
//          voteRate: 22.29,
//          elected: true,
//        },
//      ],
//    },
//    {
//      type: 'plainIndigenous',
//      districtName: '02',
//      candidates: [
//        {
//          number: 1,
//          name: {
//            label: '沒資料',
//            imgSrc: '',
//          },
//          party: {
//            label: '民主進步黨',
//            href: 'https://readr.tw',
//          },
//          votes: 8170231,
//          voteRate: 22.29,
//          elected: true,
//        },
//        {
//          number: 2,
//          name: {
//            label: '王芝安',
//            href: 'https://readr.tw',
//            imgSrc: './candidate-3.jpg',
//          },
//          party: {
//            label: '中國國家社會主義勞工黨',
//            href: 'https://readr.tw',
//          },
//          votes: 70231,
//          voteRate: 8.45,
//          elected: false,
//        },
//      ],
//    },
//    {
//      type: 'mountainIndigenous',
//      districtName: '03',
//      candidates: [
//        {
//          number: 1,
//          name: {
//            label: '王芝安',
//            imgSrc: '',
//          },
//          party: {
//            label: '民主進步黨',
//            href: '',
//          },
//          votes: 8170231,
//          voteRate: 22.29,
//          elected: true,
//        },
//        {
//          number: 2,
//          name: {
//            label: '王芝安',
//            href: '',
//            imgSrc: './candidate-3.jpg',
//          },
//          party: {
//            label: '中國國家社會主義勞工黨',
//            href: '',
//          },
//          votes: 70231,
//          voteRate: 8.45,
//          elected: false,
//        },
//      ],
//    },
//  ],
//}

async function main() {
  const ldr = new DataLoader({
    version: 'v2',
  })

  const referendumData = await ldr.loadReferendumData({
    year: '2022',
  })
  const councilData = await ldr.loadCouncilMemberDataForElectionMapProject({
    year: '2018',
    district: 'yilanCounty',
    includes: ['plainIndigenous', 'mountainIndigenous'],
  })
  const mayorData = await ldr.loadMayorData({
    year: '2022',
  })
  root.render(
    <>
      <EVC
        election={referendumData}
        stickyTopOffset="0"
        theme="electionModule"
        device="mobile"
      />
      <EVC election={councilData} stickyTopOffset="0" theme="electionModule" />
      <EVC
        election={mayorData}
        theme="electionModule"
        scrollTo="臺北市"
        stickyTopOffset="10px"
      />
    </>
  )
}
main()
