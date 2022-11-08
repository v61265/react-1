import React/* eslint-disable-line */, { useState, useEffect, useRef } from 'react'

import useUser from './use-user'
import { getLikes, giveLikes } from '../api'

/**
 * @param {string}  formId
 * @param {string}  fieldId
 * @param {string}  [identifier]
 * @return {import('../../typedef').ThumbAmountManager}
 */
export default function useThumbsUp(formId, fieldId, identifier) {
  const [thumbsUp, setThumbsUp] = useState(null)
  const originalThumbUpRef = useRef(null)
  const { userId } = useUser()

  const giveThumbUp = async (thumbUp) => {
    // add thumbUp statistic before sending request
    const originalThumbUp = originalThumbUpRef.current
    if (thumbUp) {
      setThumbsUp({
        thumbUp: originalThumbUp.thumbUp + 1,
        thumbDown: originalThumbUp.thumbDown,
      })
    } else if (thumbUp === false) {
      setThumbsUp({
        thumbUp: originalThumbUp.thumbUp,
        thumbDown: originalThumbUp.thumbDown + 1,
      })
    } else {
      setThumbsUp(originalThumbUpRef.current)
    }
    // send request without error handle
    try {
      const result = await giveLikes({ // eslint-disable-line
        name: userId,
        form: formId,
        identifier: identifier,
        responseTime: new Date(),
        field: fieldId,
        userFeedback: thumbUp,
      })
    } catch (error) {
      // do nothing for now
    }
  }

  useEffect(() => {
    const getThumbsUp = async () => {
      try {
        const result = await getLikes({
          form: formId,
          field: fieldId,
          identifier: identifier,
        })
        if (result?.data) {
          const { like, dislike } = result.data
          const thumbsValue = { thumbUp: like, thumbDown: dislike }
          originalThumbUpRef.current = thumbsValue
          setThumbsUp(thumbsValue)
        }
      } catch (error) {
        // do nothing for now
      }
    }
    getThumbsUp()
  }, [])

  return {
    thumbsUp,
    giveThumbUp,
  }
}
