import TextSelector from '../src/react-components'
import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const MockContentBlock = styled.div`
  height: 100vh;
  background-color: pink;
  margin: 0 auto;
`

const TestWrapper = styled.div`
  margin: 0 auto;
`

root.render(
  <TestWrapper>
    <MockContentBlock />
    <TextSelector
      isDebugMode={true}
      jsonUrls={[
        'https://editools-gcs.readr.tw/psycho/file_1.json',
        'https://editools-gcs.readr.tw/psycho/file_2.json',
        'https://editools-gcs.readr.tw/psycho/file_3.json',
        'https://editools-gcs.readr.tw/psycho/file_4.json',
        'https://editools-gcs.readr.tw/psycho/file_5.json',
      ]}
    />
    <MockContentBlock />
  </TestWrapper>
)
