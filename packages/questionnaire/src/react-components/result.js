import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorators from './draft/entity-decorator'
import { atomicBlockRenderer } from './draft/block-redender-fn'
import SubmitBt from './form/buttons'
const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

const ResultWrapper = styled.div`
  background: #ffffff;
  border: 2px solid #000928;
  border-radius: 6px;
  max-width: 640px;
  margin: 0 auto;
`

const InfoWrapper = styled.div`
  padding: 20px;
  @media screen and (min-width: 768px) {
    padding: 32px 40px;
  }
  .DraftEditor-root {
    font-family: 'Noto Sans CJK TC', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 200%;
    color: rgba(0, 9, 40, 0.66);
    @media screen and (min-width: 768px) {
      font-size: 18px;
    }
    div + div {
      margin-top: 16px;
    }
    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 4px;
      .public-DraftStyleDefault-depth1 {
        margin-left: 1.5rem;
      }
      li {
        display: flex;
        ::before {
          content: '';
          display: block;
          min-width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(0, 9, 40, 0.66);
          margin: 0 0.75rem;
          transform: translate(0, 1rem);
        }
      }
    }
  }
`

const ButtonWrapper = styled.div`
  border-top: 2px solid #000928;
  padding: 20px;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    padding: 32px 40px;
  }
`

const ResultName = styled.h1`
  font-family: 'Noto Serif TC', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #000928;
  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
`

const UpdateTime = styled.p`
  font-family: 'Noto Sans CJK TC', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000928;
  opacity: 0.3;
`

export default function Result({ resultData }) {
  const content = resultData.content || {
    blocks: [],
    entityMap: {},
  }
  const contentState = convertFromRaw(content)
  const editorState = EditorState.createWithContent(contentState, decorators)
  const updateTime = new Date(resultData.updatedAt || resultData.createdAt)
  const formattedTime = `${updateTime.getFullYear()}/${updateTime.getMonth() +
    1}/${updateTime.getDate()}`
  return (
    <ResultWrapper>
      <InfoWrapper>
        <ResultName>{resultData.name}</ResultName>
        <UpdateTime>{formattedTime} 更新</UpdateTime>
        <Editor
          editorState={editorState}
          readOnly
          blockRendererFn={blockRendererFn}
        />
      </InfoWrapper>
      <ButtonWrapper>
        <SubmitBt title="重新查詢" onClick={() => window.location.reload()} />
      </ButtonWrapper>
    </ResultWrapper>
  )
}
