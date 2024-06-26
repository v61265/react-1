import styled from 'styled-components'
import React from 'react' // eslint-disable-line

/**
 *  @param {Object} opts
 *  @param {number} [opts.jsonLength]
 *  @param {number} [opts.jsonFileIndex]
 *  @param {number} [opts.dataLength]
 *  @param {number} [opts.highlightIndex]
 *  @param {Function} [opts.handleChangeFileIndex]
 */
export default function Debugger({
  jsonLength = 0,
  jsonFileIndex = 0,
  dataLength = 0,
  highlightIndex = 0,
  handleChangeFileIndex = () => {},
}) {
  return (
    <Wrapper>
      <InfoItem>
        JSON: {jsonFileIndex + 1} / {jsonLength}
      </InfoItem>
      <InfoItem>
        DATA: {highlightIndex + 1} / {dataLength}
      </InfoItem>
      <InfoItem>Select JSON File:</InfoItem>
      {jsonFileIndex > 0 && (
        <ControllerBtn onClick={() => handleChangeFileIndex(jsonFileIndex - 1)}>
          prev
        </ControllerBtn>
      )}
      {jsonFileIndex < jsonLength - 1 && (
        <ControllerBtn onClick={() => handleChangeFileIndex(jsonFileIndex + 1)}>
          next
        </ControllerBtn>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 150;
  color: #ffffff;
  position: absolute;
  top: 48px;
  left: 20px;
`

const InfoItem = styled.div`
  margin-bottom: 8px;
`

const ControllerBtn = styled.button`
  padding: 8px;
  background: rgba(0, 0, 0, 0);
  outline: none;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 4px;
  & + & {
    margin-left: 4px;
  }
  &:hover {
    background: rgba(225, 225, 225, 0.3);
    cursor: pointer;
  }
`
