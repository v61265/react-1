import React from 'react' // eslint-disable-line

import useRecaptcha from './hooks/use-recaptcha'
import Form from './form/form'

/**
 * @typedef {import('../typedef').Form} Form
 *
 * @param {Object}  props
 * @param {Form[]}  props.forms
 * @param {boolean} [props.shouldUseRecaptcha=true]
 * @return {JSX.Element}
 */
export default function Feedback({ forms = [], shouldUseRecaptcha = true }) {
  const { verified } = shouldUseRecaptcha ? useRecaptcha() : { verified: true }

  return (
    <>
      {forms.map((form) => (
        <Form key={form.id} form={form} verified={verified} />
      ))}
    </>
  )
}
