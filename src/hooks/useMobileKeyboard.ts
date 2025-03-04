import { useEffect, useState } from 'react'

interface ReturnedTypes {
  isKeyboardOpen: boolean
  keyboardHeight: number
  scrollY: number
}

const useMobileKeyboard = (): ReturnedTypes => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const handleResize = () => {
    if (window.visualViewport) {
      setIsKeyboardOpen(window.visualViewport.height < window.innerHeight)
      setKeyboardHeight(window.innerHeight - window.visualViewport.height)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      handleResize()
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { isKeyboardOpen, keyboardHeight, scrollY }
}

export default useMobileKeyboard
