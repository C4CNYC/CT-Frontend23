import { createContext } from 'react'

import { ILessonUserStatus } from '@/types'

export const LessonUserContext = createContext<ILessonUserStatus[]>([])
