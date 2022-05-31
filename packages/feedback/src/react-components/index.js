import React from 'react' // eslint-disable-line

import useRecaptcha from './hooks/use-recaptcha'
import Form from './form/form'

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
