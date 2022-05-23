import React from 'react'

/* Because we will use these components as an embed code, 
 * setting global css here will influence other parts of web site which is not belong to these components.
 * To prevent the problem mentioned above happen, we decide to remove globalStyle temporary, until we find the solution.
*/

// import { ResetStyle, GlobalStyle } from './globalStyle'

import Checkbox from './form/checkbox'
// import Checkbox from './form/checkbox'

export default function QA(props) {
  return (
  
      /* <ResetStyle />
      <GlobalStyle /> */
      <Checkbox />
    
  )
}
