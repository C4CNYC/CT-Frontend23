import { useState, useCallback } from 'react'

export function useIndex(initial: number, maxSlideNum: number) {
  const [currentIndex, setIndex] = useState(initial)

  const handlePrev = useCallback(() => {
    setIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }, [])

  const handleNext = useCallback(() => {
    setIndex((prevIndex) => Math.min(maxSlideNum - 1, prevIndex + 1))
  }, [maxSlideNum])

  const lastSlide = currentIndex === maxSlideNum - 1

  return { currentIndex, handlePrev, handleNext, lastSlide }
}
