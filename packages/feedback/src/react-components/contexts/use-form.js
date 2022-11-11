import { useContext } from 'react'
import { StorageKeyContext } from './form-context'

export const useStorageKey = () => useContext(StorageKeyContext)
