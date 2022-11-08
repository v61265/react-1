import React from 'react' // eslint-disable-line

import useRecaptcha from './hooks/use-recaptcha'
import Form from './form/form'
import themes from '../themes'
import { ThemeProvider } from 'styled-components'

/**
 * @typedef {import('../typedef').Form} Form
 *
 * @param {Object}  props
 * @param {Form[]}  props.forms
 * @param {boolean} [props.shouldUseRecaptcha=true]
 * @param {string}  [props.theme='covid19']
 * @return {JSX.Element}
 */
export default function Feedback({
  forms = [],
  shouldUseRecaptcha = true,
  theme = 'covid19',
}) {
  const { verified } = shouldUseRecaptcha ? useRecaptcha() : { verified: true }

  theme = Object.keys(themes).includes(theme) ? theme : 'covid19'
  return (
    <ThemeProvider theme={themes[theme]}>
      {forms.map((form) => (
        <Form key={form.id} form={form} verified={verified} />
      ))}
    </ThemeProvider>
  )
}
