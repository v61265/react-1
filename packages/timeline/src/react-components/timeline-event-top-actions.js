import icons from './icons'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: start;
`

const LightboxButtons = styled.div`
  margin: 16px 16px 0 0;

  @media (max-width: 768px) {
    margin: 12px 12px 0 0;
  }
`

const LightboxButton = styled.button`
  margin-left: 16px;

  @media (max-width: 768px) {
    margin-left: 12px;
  }
`

export default function TimelineEventTopActions({
  showLightbox,
  showAsLightbox,
  type,
}) {
  return (
    <Wrapper id="topActions">
      <div />
      <LightboxButtons>
        {type !== 'external' ? (
          <>
            <LightboxButton onClick={showLightbox}>
              {showAsLightbox ? <icons.Close /> : <icons.Expand />}
            </LightboxButton>
          </>
        ) : (
          <LightboxButton>
            <icons.External />
          </LightboxButton>
        )}
      </LightboxButtons>
    </Wrapper>
  )
}
