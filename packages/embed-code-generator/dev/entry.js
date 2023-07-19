import { buildEmbeddedCode } from '../src/build-code/index.js'
import Dropdown from '@readr-media/react-questionnaire/lib/react-components/form/dropdown.js'
import mocks from './mocks/index.js'
import React, { useState } from 'react' // eslint-disable-line
import styled from 'styled-components'
import webpackAssets from '../dist/webpack-assets.json'
import { createRoot } from 'react-dom/client'
import ecgWebpackAssets from '@readr-media/react-embed-code-generator/dist/webpack-assets.json'
import { buildEmbeddedCode as ecgBuildEmbeddedCode } from '@readr-media/react-embed-code-generator/lib/build-code/index.js'

const ecg = {
  webpackAssets: ecgWebpackAssets,
  buildEmbeddedCode: ecgBuildEmbeddedCode,
}

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const FlexBox = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-around;
`

const Block = styled(FlexBox)``

const LeftBlock = styled(FlexBox)`
  flex-direction: column;
  width: 40vw;
`

const RightBlock = styled.div`
  width: 50vw;
`

const TextBlock = styled.textarea`
  font-size: 16px;
  max-height: 80vh;
  overflow: scroll;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  width: 100%;
  height: 100%;
`

const pkgOptions = [
  {
    id: 'react-dropping-text',
    name: 'Dropping Text',
    value: 'react-dropping-text',
  },
  {
    id: 'react-random-text-selector',
    name: 'Random Text Selector',
    value: 'react-random-text-selector',
  },
  {
    id: 'react-karaoke',
    name: 'Karaoke',
    value: 'react-karaoke',
  },
  {
    id: 'react-dual-slides',
    name: 'Dual Slides',
    value: 'react-dual-slides',
  },
  {
    id: 'react-three-story-points',
    name: 'Three Story Points',
    value: 'react-three-story-points',
  },
  {
    id: 'react-live-blog',
    name: 'Live Blog',
    value: 'react-live-blog',
  },
  {
    id: 'react-election-widgets-votes-comparison',
    name: 'Election Widgets: Votes Comparison',
    value: 'react-election-widgets-votes-comparison',
  },
  {
    id: 'react-election-widgets-seat-chart',
    name: 'Election Widgets: Seat Chart',
    value: 'react-election-widgets-seat-chart',
  },
  {
    id: 'react-questionnaire',
    name: 'Questionnaire',
    value: 'react-questionnaire',
  },
  {
    id: 'react-theatre',
    name: 'Theatre',
    value: 'react-theatre',
  },
]

const scriptUrlOptios = [
  {
    id: 'localhost',
    name: 'localhost',
    value: 'localhost',
  },
  {
    id: 'cdn',
    name: 'cdn（unkpkg.com）',
    value: 'cdn',
  },
]

function Panel() {
  const [selectedPkg, setSelectedPkg] = useState('')
  const [selectedScriptUrl, setSelectedScriptUrl] = useState('')
  const mockData = mocks?.[selectedPkg] || {}

  let embedCode = ''
  if (selectedPkg) {
    if (selectedScriptUrl === 'localhost') {
      // @ts-ignore
      embedCode = buildEmbeddedCode(selectedPkg, mockData, webpackAssets)
    } else if (selectedScriptUrl === 'cdn') {
      embedCode = ecg.buildEmbeddedCode(
        // @ts-ignore
        selectedPkg,
        mockData,
        ecg.webpackAssets
      )
    }
  }

  return (
    <Block>
      <LeftBlock>
        <div>
          <Dropdown
            title="請選擇要產生 embed code 的 component"
            options={pkgOptions}
            checkedValue={selectedPkg}
            onChange={(pkg) => {
              setSelectedPkg(pkg)
            }}
          />
        </div>
        <div>
          <Dropdown
            title="請選擇要使用的 script 位址"
            options={scriptUrlOptios}
            checkedValue={selectedScriptUrl}
            onChange={(url) => {
              setSelectedScriptUrl(url)
            }}
          />
        </div>
        <div>
          <h3>Component Props:</h3>
          <TextBlock readOnly value={JSON.stringify(mockData, null, 2)} />
        </div>
      </LeftBlock>
      <RightBlock>
        <h3>Embed Code:</h3>
        <TextBlock readOnly value={embedCode} />
      </RightBlock>
    </Block>
  )
}

root.render(<Panel />)
