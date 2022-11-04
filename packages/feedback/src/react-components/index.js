import React from 'react' // eslint-disable-line

import useRecaptcha from './hooks/use-recaptcha'
import Form from './form/form'

/**
 * @typedef {import('../typedef').Form} Form
 *
 * @param {Object}  props
 * @param {Form[]}  props.forms
 * @return {JSX.Element}
 */
export default function Feedback({ forms = [] }) {
  const { verified } = useRecaptcha()

  return (
    <>
      {forms.map((form) => (
        <Form key={form.id} form={form} verified={verified} />
      ))}
    </>
  )
}
