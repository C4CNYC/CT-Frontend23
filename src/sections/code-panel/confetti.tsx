import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import type ConfettiType from 'react-confetti/dist/types/Confetti'

const ReactConfetti = dynamic(async () => await import('react-confetti'), { ssr: false })

export default function Confetti({
  completedLessonId,
}: {
  completedLessonId?: string
}): React.ReactElement | null {
  const [show, setShow] = useState(!!completedLessonId)

  useEffect(() => {
    setShow(true)
  }, [completedLessonId])

  const onConfettiComplete = (confetti?: ConfettiType) => {
    setShow(false)
    confetti?.reset()
  }

  return show ? (
    <ReactConfetti
      numberOfPieces={500}
      recycle={false}
      gravity={0.25}
      onConfettiComplete={onConfettiComplete}
    />
  ) : null
}
