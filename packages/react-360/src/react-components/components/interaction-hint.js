import Lottie from 'react-lottie'
import styled from 'styled-components'

import { animationData } from '../json/animationData.json.js'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: ${({ showHint }) => (showHint ? 1 : 0)};
  transition: opacity 3s;
`

const HintWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Hint = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 4px;
`

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
}

export default function InteractionHint({ showHint }) {
  return (
    <Wrapper showHint={showHint}>
      <HintWrapper>
        <Lottie options={lottieOptions} height={64} width={64} />
        <Hint>點擊拖曳可以環視四周</Hint>
      </HintWrapper>
    </Wrapper>
  )
}
