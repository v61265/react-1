import styled from 'styled-components'
import icons from './icons'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Divider = styled.div`
  position: absolute;
  left: calc((100% - 384px) / 2);
  width: 384px;
  height: 0;
  border: 2px solid #000;

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    width: 100%;
  }
`

const Control = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 18px;
  }
`

const ControlTitle = styled.div`
  display: inline-block;
  margin-right: 6px;
  font-size: 16px;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const ControlButton = styled.button`
  border: 1px solid #000;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  transform: ${(props) => (props.newToOld ? '' : 'rotate(180deg)')};
  background-color: transparent;
  cursor: pointer;
`

export default function LiveBlogControl({ newToOld, onChangeOrder }) {
  return (
    <Wrapper>
      <div></div>
      <Divider />
      <Control>
        <ControlTitle>{newToOld ? '從新到舊' : '從舊到新'}</ControlTitle>
        <ControlButton onClick={onChangeOrder} newToOld={newToOld}>
          <icons.Order />
        </ControlButton>
      </Control>
    </Wrapper>
  )
}
