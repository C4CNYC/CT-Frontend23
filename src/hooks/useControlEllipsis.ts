import { useEffect, useRef, useState } from 'react'

const useControlEllipsis = () => {
  const textRef = useRef<HTMLElement | null>(null)
  const [longDesc, setLong] = useState(false)

  const ellipsisHandler = () => {
    if (textRef.current) {
      return textRef.current.offsetWidth < textRef.current.scrollWidth
    }
    return false
  }

  useEffect(() => {
    setLong(ellipsisHandler())
  }, [])

  return { longDesc, textRef }
}

export default useControlEllipsis
