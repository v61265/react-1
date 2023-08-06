import React/* eslint-disable-line */, { useState, useEffect, useRef } from 'react'

import useUser from './use-user'
import { getOptionSummary, giveOptions as giveOptionsRequest } from '../api'

/**
 * @param {string}  formId
 * @param {string}  fieldId
 * @param {string}  [identifier]
 * @return {import('../../typedef').OptionAmountManager}
 */
export default function useOptions(formId, fieldId, identifier) {
  const [optionSummary, setOptionSummary] = useState(null)
  const originalOptionSummaryRef = useRef(null)
  const { userId } = useUser()

  const giveOptions = async (options) => {
    // add statistic before sending request
    const originalOptionSummary = originalOptionSummaryRef.current
    const memorySet = new Set()
    const filterdOptions = []

    if (options.length > 0) {
      const copyOptionSummary = Object.assign({}, originalOptionSummary)
      for (let o of options) {
        if (o in copyOptionSummary && memorySet.has(o) === false) {
          copyOptionSummary[o] += 1
          memorySet.add(o)
          filterdOptions.push(o)
        }
      }

      setOptionSummary(copyOptionSummary)
    } else {
      setOptionSummary(originalOptionSummary)
    }

    if (!userId) return
    // send request without error handle
    try {
      const result = await giveOptionsRequest({ // eslint-disable-line
        name: userId,
        form: formId,
        field: fieldId,
        identifier: identifier,
        responseTime: new Date(),
        userFeedback: filterdOptions,
      })
    } catch (error) {
      // do nothing for now
    }
  }

  useEffect(() => {
    const getOptionData = async () => {
      try {
        const result = await getOptionSummary({
          form: formId,
          field: fieldId,
          identifier: identifier,
        })

        if (result?.data) {
          originalOptionSummaryRef.current = result.data
          setOptionSummary(result.data)
        }
      } catch (error) {
        // do nothing for now
      }
    }

    getOptionData()
  }, [])

  return {
    optionSummary,
    giveOptions,
  }
}
