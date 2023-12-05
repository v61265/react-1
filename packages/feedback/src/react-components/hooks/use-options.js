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

  const giveOptions = async (defaultOptions, newOptions) => {
    // We use defaultOptions and newOptions to handle options change by following rules:
    // Elements in defaultOptions but not in newOptions will make subscription to summary.
    // Elements in newOptions but not in defaultOptions will make addition to summary.
    // Elements both in or not in don't make any effort.
    const originalOptionSummary = originalOptionSummaryRef.current
    const defaultSet = new Set()
    const memorySet = new Set()
    const filterdOptions = []

    if (newOptions.length > 0) {
      const copyOptionSummary = Object.assign({}, originalOptionSummary)

      if (defaultOptions.length > 0) {
        for (let o of defaultOptions) {
          if (defaultSet.has(o) === false) {
            copyOptionSummary[o] -= 1
            defaultSet.add(o)
          }
        }
      }

      for (let o of newOptions) {
        if (o in copyOptionSummary && memorySet.has(o) === false) {
          copyOptionSummary[o] += 1
          memorySet.add(o)
          filterdOptions.push(o)
        }
      }

      setOptionSummary(copyOptionSummary)
    } else {
      if (defaultOptions.length > 0) {
        const copyOptionSummary = Object.assign({}, originalOptionSummary)
        for (let o of defaultOptions) {
          copyOptionSummary[o] -= 1
          setOptionSummary(copyOptionSummary)
        }
      } else {
        setOptionSummary(originalOptionSummary)
      }
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
