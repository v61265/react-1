import { useRef } from 'react'
import styled from '../styled-components.js'
import breakpoint from '../breakpoint.js'
import { Transition } from 'react-transition-group'

const Block = styled.div`
  transform: ${
    /**
     *  @param {Object} props
     *  @param {string} props.topOffset
     */
    (props) => {
      return `translateY(${props.topOffset || '0px'});`
    }
  }

  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(280 / 320 * 100%);
  margin: 0 auto;

  @media (${breakpoint.devices.laptop}) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 80px;
  }

`

const Content = styled.div`
  font-size: 20px;
  line-height: 150%;
  font-weight: 400;
  margin-top: 32px;

  @media (${breakpoint.devices.laptop}) {
    width: 440px;
    order: 1;
  }

  @media (${breakpoint.devices.laptopL}) {
    width: 560px;
  }
`

const Img = styled.img`
  height: calc(50vh - 40px);
  object-fit: cover;
  margin-top: 40px;

  @media (${breakpoint.devices.laptop}) {
    width: 440px;
    height: 330px;
    order: 2;
  }

  @media (${breakpoint.devices.laptopL}) {
    width: 560px;
    height: 420px;
  }
`

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

/**
 *  @export
 *  @typedef {Object} Slide
 *  @param {string} imgSrc
 *  @param {string[]} content
 */

/**
 *  @param {Object} props
 *  @param {boolean} props.inProp
 *  @param {Slide} props.slide
 *  @param {string} [props.className]
 *  @param {string} [props.topOffset='0px']
 *  @returns {React.ReactElement}
 */
export default function Background({
  className,
  topOffset = '0px',
  slide,
  inProp,
}) {
  const nodeRef = useRef(null)
  return (
    <div className={className}>
      <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
        {(state) => {
          return (
            <Block
              ref={nodeRef}
              topOffset={topOffset}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <Img src={slide.imgSrc}></Img>
              <Content>{slide.content}</Content>
            </Block>
          )
        }}
      </Transition>
    </div>
  )
}
