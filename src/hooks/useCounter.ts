import { useState } from 'react'

export function useCounter(initialValue = 10): [number, () => void, () => void] {
  const [value, setValue] = useState<number>(initialValue)
  const decrement = () => setValue(value - 1)
  const increment = () => setValue(value + 1)

  return [value, decrement, increment]
}
