import React from 'react'
import { ResetStyle, GlobalStyle } from './globalStyle'

import Checkbox from './form/checkbox'
// import Checkbox from './form/checkbox'

export default function QA(props) {
  return (
    <div>
      <ResetStyle />
      <GlobalStyle />
      <Checkbox />
    </div>
  )
}
