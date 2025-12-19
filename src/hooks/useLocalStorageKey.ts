import { useEffect, useState } from 'react'

export function useLocalStorageKey(key: string) {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key) || '{}'))

  useEffect(() => {
    const handler = (e: CustomEvent<{ key: string; value: string }>) => {
      if (e.detail.key === key) setValue(e.detail.value)
    }
    window.addEventListener('localstorage-update', handler as any)
    return () => window.removeEventListener('localstorage-update', handler as any)
  }, [key])

  return value
}
