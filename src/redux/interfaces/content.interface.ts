import { Unit } from '@/redux/interfaces/challenges.interface'
import { BaseResponseInterface, BaseSearchInterface } from '@/utils'

import { LessonContentType } from '../enums/lesson-content-type.enum'
import { AGE, GRADING, LEVEL } from '../services/interfaces/courseUnits.interface'
import { ILesson } from '../services/interfaces/lesson.interface'

export type { ILesson }

export interface ICourseElement {
  id: string
  course_id?: string
  name: string
  level: string
  price: string
  description: string
  active: boolean
  cover: string
  draft: boolean
  progress: number | null
  likes_count?: string
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  total_lessons: number
  liked: boolean
  my_rating: number | null
}

export interface ICourseContent {
  id: string
  units: Unit[]
  name: string
  level: string
  price: string
  description: string
  active: boolean
  cover: string
  draft: boolean
  total_lessons: number
}

export interface IModule {
  active?: boolean
  key: any
  avatar: string | null
  background?: string | null
  duration: Record<string, number>
  name: string
  type: string
  progress?: number
  total_progress?: number
  lessons: Array<ILesson & BaseResponseInterface>
  lessonToUnits?: { lesson: ILesson }[]
  description?: string
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  tips?: string[]
  teacher_slides?: string
  lesson_plans?: string
  teacher_forum?: string
  level: LEVEL
  customLevel: string
  age: AGE
  customAge: string
  grading: GRADING
  brief?: string
  audience?: string
}

export interface IModuleContent {
  active: boolean
  avatar: string | null
  background?: string | null
  description: string
  id: string
  name: string
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  progress: string | null
  duration: string | null
  teacher_slides?: string
  lesson_plans?: string
  teacher_forum?: string
}

export interface ILessonCurrent {
  active: boolean
  name: string
  description: string
  draft?: boolean
  id: string
  lessons?: []
  progress?: number | null
}

export interface ILessonContentProgress {
  id: string
  createdAt: string
  updatedAt: string
  progress_meta: Record<string, string>
}

export interface ILessonContent {
  body: string
  preload_body: string
  tips: string
  solution_body: string
  validations: Array<IValidation & BaseResponseInterface>
  type: LessonContentType
  meta: Record<string, any>
  //integrations: IIntegration[]
  progress?: ILessonContentProgress[]
  title?: string
  id?: string
  bg_color?: string
}

export interface ISkill {
  name: string
  description: string
  id: string
}

export interface IValidation {
  name: string
  regex: string
}

// ================
export interface IModulesSearchParams extends BaseSearchInterface {
  name?: string
  course_id?: string
}

export interface ILessonSearchParams extends BaseSearchInterface {
  name?: string
  module_id?: string
  assignment_id?: string
}

export interface ICourseSearchParams extends BaseSearchInterface {
  class_id?: string
  school_id?: string
  name?: string
}

export interface LastVisitedData {
  lastVisitedUnitId: string
  lastVisitedLessonId: string
}

export interface LastVisitedBody {
  unitId: string
  lessonId: string
}

export interface LastVisitedState {
  unitId: string | null
  lessonId: string | null
}

export interface ILastVisitedSlide {
  id: string
  slideNumber: number
  lessonId: string
}

export interface ILastVisitedSlideBody {
  lessonId: string
  slideNumber: number
}
