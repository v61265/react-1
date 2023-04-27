import Matter from 'matter-js'
import styled from '../styled-components.js'
import { useEffect } from 'react'

const { Bodies, Body, Common, Composite, Engine } = Matter

const Block = styled.div`
  position: relative;
`

const Text = styled.span`
  position: absolute;
  color: black;
  cursor: move;
  user-select: none;
`

/**
 *  @param {Object} props
 *  @param {string[]} props.textArr
 *  @param {number} [props.canvasWidth] - if not provided, then default value will be `window.innerWidth`
 *  @param {number} [props.canvasHeight] - if not provided, then default value will be `window.innerHeight`
 *  @returns {React.ReactElement}
 */
export default function DroppingText({ textArr, canvasWidth, canvasHeight }) {
  useEffect(() => {
    const wallWidth = 60 // px
    const droppingDistanceInterval = 100 // px

    const windowWidth = canvasWidth ?? window.innerWidth
    const windowHeight = canvasHeight ?? window.innerHeight

    const droppingTextNodes = document.querySelectorAll(
      '[data-dropping-text=true]'
    )

    const engine = Engine.create()

    // adjust animation speed
    engine.timing.timeScale = 1.2

    const textRectangles = []

    for (let i = 0; i < droppingTextNodes.length; i++) {
      // dropping text node
      const dtn = droppingTextNodes[i]
      const blockWidth = dtn?.clientWidth
      const blockHeight = dtn.clientHeight

      // random x for initial position of dropping texts
      const randomX = Common.random(wallWidth, windowWidth - wallWidth)

      // the smaller value, the later dropping
      const y = 0 - i * droppingDistanceInterval

      // create the rectangle for the certain dropping text
      const rectangle = Bodies.rectangle(randomX, y, blockWidth, blockHeight)

      // random rotate degree of the dropping rectangle
      const randomDegree = Common.random(0, 60)
      const radian = (randomDegree * Math.PI) / 180

      // rotate the rectangle
      Body.setAngle(rectangle, radian)

      const textRectangle = {
        w: blockWidth,
        h: blockHeight,
        matterBody: rectangle,
        domElement: dtn,
        render() {
          const { x, y } = this.matterBody.position
          if (x > windowWidth || x < 0) {
            return
          }
          if (y > windowHeight) {
            return
          }
          // @ts-ignore
          this.domElement.style.top = `${y - this.h / 2}px`
          // @ts-ignore
          this.domElement.style.left = `${x - this.w / 2}px`
          // @ts-ignore
          this.domElement.style.transform = `rotate(${this.matterBody.angle}rad)`
        },
      }

      textRectangles.push(textRectangle)
    }

    // Add text rectangles into world
    Composite.add(
      engine.world,
      textRectangles.map((tr) => tr.matterBody)
    )

    const walls = [
      // ground
      Bodies.rectangle(
        windowWidth / 2, // x position
        windowHeight, // y position
        windowWidth, // ground width
        wallWidth, // ground height
        { isStatic: true }
      ), // static in the engine world, which means it won't move

      // left wall
      Bodies.rectangle(
        0, // x position
        windowHeight / 2, // y position
        wallWidth, // wall width
        windowHeight, // wall height
        { isStatic: true }
      ),

      // right wall
      Bodies.rectangle(
        windowWidth, // x position
        windowHeight / 2, // y position
        wallWidth, // wall width
        windowHeight, // wall height
        { isStatic: true }
      ),
    ]

    // Add walls into world
    Composite.add(engine.world, walls)

    let raf
    const rerender = () => {
      // update dropping text css
      textRectangles.forEach((tr) => {
        tr.render()
      })
      Engine.update(engine)
      raf = requestAnimationFrame(rerender)
    }
    raf = requestAnimationFrame(rerender)

    return () => {
      console.log('cancelAnimationFrame')
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <Block>
      {textArr.map((txt, idx) => {
        return (
          <Text
            data-dropping-text
            key={idx}
            dangerouslySetInnerHTML={{ __html: txt }}
          />
        )
      })}
    </Block>
  )
}
