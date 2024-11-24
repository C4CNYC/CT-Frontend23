import { useState } from 'react'

export function useBoolean(initialValue = false): [boolean, () => void, () => void] {
  const [state, stateSet] = useState<boolean>(initialValue)
  const setTrue = () => stateSet(true)
  const setFalse = () => stateSet(false)
  return [state, setTrue, setFalse]
}
