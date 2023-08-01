import 'regenerator-runtime/runtime'
import React from 'react' // eslint-disable-line
import tl from '../src'
import { createRoot } from 'react-dom/client'
import styled from 'styled-components'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)

const Header = styled.div`
  background: white;
  border: 2px solid black;
  position: fixed;
  height: 66px;
  width: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 568px) {
    height: 80px;
  }
`

const ContentAbove = styled.div`
  height: 150vh;
  background: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentBelow = styled.div`
  height: 200vh;
  background: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`

async function main() {
  const ldr = new tl.DataLoader()
  const data = await ldr.loadData(
    'https://storage.googleapis.com/editools-gcs-dev.readr.tw/files/liveblogs/deepfakeDev.json'
  )
  root.render(
    <>
      <Header>Readr Header</Header>
      <ContentAbove>Timeline 之前的段落</ContentAbove>
      <tl.ReactComponent.Timeline liveblog={data} />
      <ContentBelow>Timeline 之後的段落</ContentBelow>
    </>
  )
}
main()
