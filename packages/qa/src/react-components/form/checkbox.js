import React from 'react'
import styled from 'styled-components'

const Title = styled.h3`
  font-family: 'Noto Sans CJK TC';
  font-size: 18px;
  line-height: 200%;
  color: #000928;
  width: calc(248/320)%;
`

export default function Checkbox(props) {
  return (
    <Title>
      {props.title}
      <ol>
        <li>
          list-1
        </li>
        <li>
          list-2
        </li>
      </ol>
    </Title>
  )
}
