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

/**
 *
 * @param {Object} props
 * @param {string} props.imageUrl - 360 image url
 * @param {Array} props.hotspotsConfig -  hotspots for 360 image
 * @param {string} props.caption - 360 image caption
 * @param {boolean} props.isFullScreenWidth - decide image width: true for '100vw', false for '100%
 * @returns {React.JSX}
 */
export default function React360({
  imageUrl,
  hotspotsConfig,
  caption,
  isFullScreenWidth = true,
}) {
  const pannellumRef = useRef(null)
  const wrapperRef = useRef(null)
  const onceShown = useOnceShown(wrapperRef)
  let hotspots = Array.isArray(hotspotsConfig) ? hotspotsConfig : []

  const [imageHeight, setImageHeight] = useState(0)

  useEffect(() => {
    setImageHeight(window.innerWidth / 2)
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
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
