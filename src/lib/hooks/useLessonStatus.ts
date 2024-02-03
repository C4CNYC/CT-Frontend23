import { useContext } from 'react'

import { LessonUserContext } from '@/context/lesson-context'

export function useLessonStatus() {
  return useContext(LessonUserContext)
}
