import { BaseResponseInterface } from '@root/src/utils/baseResponse.interface'

import { ISkill } from '../../interfaces/content.interface'
import { LessonMachineLang } from '../enums/lesson-language.enum'
import { LessonType } from '../enums/lesson-type.enum'

import { ILessonContent } from './courseUnits.interface'
import { IIntegration } from './integration.interface'

export const LessonDisplayEngine = {
  CodePanel: 'codepanel',
  Slides: 'slides',
  Custom: 'custom',
}

export type LessonMeta = {
  humanLang: string
  displayEngine?: (typeof LessonDisplayEngine)[keyof typeof LessonDisplayEngine]
  machineLang: keyof typeof LessonMachineLang
  /**  allow students to create multiple files    */
  createMultipleFiles: 0 | 1
  /**  Teacher/Owner cant delete the lesson    */
  lock: 0 | 1
  [key: string]: string | number | undefined
}

export interface ILesson {
  active: boolean
  contents?: ILessonContent[]
  data: []
  description: string
  draft: boolean
  duration: Record<string, number> | null
  head?: string
  id: string
  independent: boolean
  integrations: Array<IIntegration & BaseResponseInterface>
  meta: LessonMeta
  name: string
  progress: number | null
  slug?: string
  sort?: number
  skills: ISkill[]
  tips: string[] | []
  type: LessonType
  userId?: string
}

export interface IStudentProgress {
  lessonId: string
  numberOfCompletedChallenges: number
}
export interface IProgressGuest {
  lastSlide: number
  numberOfCompletedChallenges: number
  challanges: Array<{ courseId: string; moduleId: string; slideId: string; processed?: boolean }>
}
