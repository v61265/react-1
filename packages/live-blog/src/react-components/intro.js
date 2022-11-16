import styled from 'styled-components'
import { toLocaleString } from '../utils/date'

const Wrapper = styled.div`
  padding-bottom: 40px;

  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
`

const Title = styled.div`
  font-size: 28px;
  font-weight: 900;
  line-height: 41px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
  }
`

const Description = styled.p`
  margin-top: 20px;
  text-align: justify;
  font-size: 16px;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const UpdateTime = styled.p`
  margin-top: 28px;
  text-align: center;
  font-weight: 900;
  font-size: 16px;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export default function Intro({ intro }) {
  const { title, description, time } = intro

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <UpdateTime>
        最後更新時間：
        {toLocaleString(time)}
      </UpdateTime>
    </Wrapper>
  )
}
