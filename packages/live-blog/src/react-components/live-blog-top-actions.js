import icons from './icons'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: start;
`

const PinIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  position: relative;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 44px 44px 0 0;
  border-color: #000000 transparent transparent transparent;

  @media (max-width: 768px) {
    border-width: 28px 28px 0 0;
  }
`

const PinedIcon = styled(icons.PinStar)`
  position: absolute;
  top: 5px;
  left: 6px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
    top: 4px;
    left: 3px;
  }
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

export default function LiveBlogTopActions({
  pined,
  copyUrlHandler,
  showLightbox,
  showAsLightbox,
  type,
}) {
  return (
    <Wrapper>
      {pined ? (
        <PinIconWrapper>
          <Triangle />
          <PinedIcon />
        </PinIconWrapper>
      ) : (
        <div />
      )}
      <LightboxButtons>
        {type !== 'external' ? (
          <>
            <LightboxButton onClick={copyUrlHandler}>
              <icons.CopyLink />
            </LightboxButton>
            <LightboxButton onClick={showLightbox}>
              {showLightbox ? <icons.Close /> : <icons.Expand />}
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
