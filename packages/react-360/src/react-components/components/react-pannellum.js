import { forwardRef } from 'react'
import { Pannellum } from '@readr-media/pannellum-react'

export default forwardRef(function ReactPannellum(props, ref) {
  const { imageUrl, hotspots } = props
  console.log('ReactPannellum rendered')

  return (
    <Pannellum
      ref={ref}
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
          `current viewing point: pitch ${ref.current
            .getViewer()
            .getPitch()}, yaw ${ref.current.getViewer().getYaw()}`
        )
        // Calculate the pitch and yaw based on the click coordinates
        const viewer = ref.current.getViewer()
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
  )
})
