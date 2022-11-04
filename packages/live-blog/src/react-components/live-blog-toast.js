import styled from 'styled-components'

const ToastWrapper = styled.div`
  position: absolute;
  top: -9px;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
`

const Toast = styled.div`
  width: 100px;
  height: 28px;
  background-color: black;
  color: #fff1db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 100%;
  border-radius: 4px;
`

export default function LiveBlogToast({ message }) {
  return (
    <ToastWrapper>
      <Toast>{message}</Toast>
    </ToastWrapper>
  )
}
