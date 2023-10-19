import { Pannellum } from '@readr-media/pannellum-react'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

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
  let hotspots = Array.isArray(hotspotsConfig) ? hotspotsConfig : []

  const [imageHeight, setImageHeight] = useState(0)

  useEffect(() => {
    setImageHeight(window.innerWidth / 2)
  }, [])

  return (
    <Wrapper>
      <PannellumWrapper
        wrapperHeight={`${imageHeight}px`}
        isFullScreenWidth={isFullScreenWidth}
      >
        {!imageUrl ? (
          <Error>No Image Url Provided! `{imageUrl}`</Error>
        ) : (
          <Pannellum
            ref={pannellumRef}
            width="100%"
            height="100%"
            image={imageUrl}
            pitch={0}
            yaw={0}
            // set maxHfov, minHfov to prevent zoom in/out
            hfov={100}
            maxHfov={100}
            minHfov={100}
            autoLoad
            showZoomCtrl={false}
            showFullscreenCtrl={false}
            mouseZoom={false}
            onMousedown={(e) => {
              console.log(
                `current viewing point: pitch ${pannellumRef.current
                  .getViewer()
                  .getPitch()}, yaw ${pannellumRef.current
                  .getViewer()
                  .getYaw()}`
              )
              // Calculate the pitch and yaw based on the click coordinates
              const viewer = pannellumRef.current.getViewer()
              const pitchYaw = viewer.mouseEventToCoords(e)
              console.log('Clicked at Pitch:', pitchYaw[0], 'Yaw:', pitchYaw[1])
            }}
          >
            {hotspots.map((hotspot) => (
              <Pannellum.Hotspot
                key={`${hotspot.text}_${hotspot.pitch}_${hotspot.yaw}`}
                type={hotspot.type}
                pitch={hotspot.pitch}
                yaw={hotspot.yaw}
                text={hotspot.text}
                URL={hotspot.url}
              />
            ))}
          </Pannellum>
        )}
      </PannellumWrapper>
      {caption && (
        <Caption isFullScreenWidth={isFullScreenWidth}>{caption}</Caption>
      )}
    </Wrapper>
  )
}
