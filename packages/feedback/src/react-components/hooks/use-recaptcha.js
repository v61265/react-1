import React /* eslint-disable-line */, { useState, useEffect, useCallback } from 'react'

import { verifyRecaptcha } from '../api'

const action = 'submit'

/**
 * @typedef {Object}    Recaptcha
 * @property {boolean}  verified
 *
 * @return {Recaptcha}
 */
export default function useRecaptcha() {
  const [verified, setVerified] = useState(false)

  const getReCaptchaToken = useCallback(() => {
    const { grecaptcha } = window
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(
        '6LfjDw4gAAAAAEoKF6fhiBvFEoPPFvO7KUb_-50J',
        { action }
      )
      try {
        const result = await verifyRecaptcha({ token, recaptchaAction: action }) // eslint-disable-line
      } catch (error) {
        if (error.response.status === 401) {
          setVerified(false)
          return
        }
      }
      setVerified(true)
    })
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://www.google.com/recaptcha/enterprise.js?render=6LfjDw4gAAAAAEoKF6fhiBvFEoPPFvO7KUb_-50J'
    script.id = 'recaptcha-key'
    script.onload = async () => {
      getReCaptchaToken()
    }
    document.body.appendChild(script)
  }, [])

  return { verified }
}
