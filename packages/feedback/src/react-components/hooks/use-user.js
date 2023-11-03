import React /* eslint-disable-line */, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStorageKey } from '../contexts/use-form'

/**
 * @typedef {Object}          User
 * @property {string | null}  userId
 *
 * @return {User}
 */
export default function useUser() {
  const storageKey = useStorageKey()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem(storageKey)

    if (userId) {
      setUserId(userId)
    } else {
      const userId = uuidv4()
      setUserId(userId)
      localStorage.setItem(storageKey, userId)
    }
  })

  return { userId }
}
