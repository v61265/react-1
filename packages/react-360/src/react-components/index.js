import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useOnceShown from './hook/useOnceShown.js'
import ReactPannellum from './components/react-pannellum.js'

const Wrapper = styled.div``

const PannellumWrapper = styled.div`
  position: relative;
  height: ${({ wrapperHeight }) => wrapperHeight || '0px'};
  ${({ isFullScreenWidth }) =>
    isFullScreenWidth
      ? `
    width: 100vw;
    left: calc(50% - 50vw);
  `
      : `
    width: 100%;
  `}
`

const Caption = styled.figcaption`
  font-size: 14px;
  ine-height: 1.8;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 12px;
  @media (min-width: 768px) {
    margin-top: 20px;
  }
  ${({ isFullScreenWidth }) =>
    isFullScreenWidth &&
    `
    text-align: center;
  `}
`

const Error = styled.div`
  width: 100%;
  height: 100%;
  color: red;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditorWrapper = styled.div`
  margin: 24px 0;
`

const EditorHint = styled.label`
  color: #374151;
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  min-width: 120px;
  margin-bottom: 4px;
`

const EditorPanel = styled.textarea`
  max-width: 600px;
  height: 100px;
  border-color: #ccd1d5;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background-color: #fafbfc;
  border-color: #e1e5e9;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  color: #374151;
  font-size: 1rem;
  line-height: 1.4;
  outline: 0;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  resize: vertical;
  -webkit-transition: background-color 130ms, box-shadow 130ms,
    border-color 130ms;
  transition: background-color 130ms, box-shadow 130ms, border-color 130ms;
  width: 100%;
`

/**
 * @typedef {Object} ImageUrls
 * @property {string} pc
 * @property {string} mb
 */

/**
 *
 * @param {Object} props
 * @param {ImageUrls} props.imageRwdUrls - 360 image url
 * @param {Array} props.hotspotsConfig -  hotspots for 360 image
 * @param {string} props.caption - 360 image caption
 * @param {boolean} props.isFullScreenWidth - decide image width: true for '100vw', false for '100%
 * @param {boolean} props.isEditMode - show edit mode to help editor get the needed data like hotspot's pitch and yaw
 * @returns {React.JSX}
 */
export default function React360({
  imageRwdUrls,
  hotspotsConfig,
  caption,
  isFullScreenWidth = true,
  isEditMode = false,
}) {
  const pannellumRef = useRef(null)
  const wrapperRef = useRef(null)
  const onceShown = useOnceShown(wrapperRef)
  const [hotspotData, setHotspotData] = useState({
    pitch: 0,
    yaw: 0,
    type: 'info',
    text: 'Change this to desired wording.',
    url: 'Add link or remove to prevent redirect',
  })

  let hotspots = Array.isArray(hotspotsConfig) ? hotspotsConfig : []

  const [imageHeight, setImageHeight] = useState(0)
  const [device, setDevice] = useState('mb')

  const imageUrl = imageRwdUrls[device]

  useEffect(() => {
    setImageHeight(window.innerWidth / 2)
    if (window.innerWidth > 768) {
      setDevice('pc')
    }
  }, [])

  /**
   * @param {number} pitch
   * @param {number} yaw
   */
  const onEditorClick = (pitch, yaw) => {
    setHotspotData((pre) => ({ ...pre, pitch, yaw }))
  }

  return (
    <Wrapper ref={wrapperRef}>
      {isEditMode && (
        <>
          <EditorWrapper>
            <EditorHint>
              單一熱點資料，點擊下方圖片後更新角度資料，請自行修改 text 和 url
              後複製到熱點 json 的 array [] 之中。
            </EditorHint>
            <EditorPanel
              defaultValue={JSON.stringify(hotspotData)}
            ></EditorPanel>
          </EditorWrapper>
        </>
      )}
      <PannellumWrapper
        wrapperHeight={`${imageHeight}px`}
        isFullScreenWidth={isFullScreenWidth}
      >
        {!imageUrl ? (
          <Error>No Image Url Provided! `{imageUrl}`</Error>
        ) : (
          onceShown && (
            <ReactPannellum
              ref={pannellumRef}
              imageUrl={imageUrl}
              hotspots={hotspots}
              onEditorClick={isEditMode ? onEditorClick : null}
            />
          )
        )}
      </PannellumWrapper>
      {caption && (
        <Caption isFullScreenWidth={isFullScreenWidth}>{caption}</Caption>
      )}
    </Wrapper>
  )
}
