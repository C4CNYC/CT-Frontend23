import { BaseResponseInterface, BaseSearchInterface } from '@/utils'

import { LessonContentComplexity } from '../enums/lesson-content-complexity.enum'
import { LessonContentType } from '../enums/lesson-content-type.enum'

import { ILessonContentValidation } from './lessonContentValidation.interface'

export interface IModule {
  id: string
  active: boolean
  name: string
  description: string
  data: []
  avatar: string | null
  tips: string[] | []
  duration: string | null
}

export interface ILesson {
  id: string
  data: []
  active: boolean
  name: string
  description: string
  head?: string
  duration: Record<string, number> | null
  meta: Record<string, Record<string, any>>
  independent: boolean
  type: 'practical' | 'exercise' | 'quiz'
  sort?: number
  slug?: string
}

export interface ICourse {
  name: string
  content_id: string
  level: string
  price: string
  description: string
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  active: boolean
  cover: string
  public: boolean
  catalog: boolean
  draft: boolean
  skills: []
  units: IModule[]
}

export interface ILessonContent {
  id: string
  body: string
  name: string
  type: LessonContentType
  slug: string
  title: string
  description: string
  cover: string
  active: boolean
  draft: boolean
  tags: string[]
  preload_body: string
  tips: string
  solution_body: string
  meta: Record<string, any>
  complexity: LessonContentComplexity
  validations: Array<ILessonContentValidation & BaseResponseInterface>
  bg_color?: string
}

export interface ILessonContentUpdate {
  body?: string
  type?: LessonContentType
  slug?: string
  tips?: string
  title?: string
  description?: string
  active?: boolean
  draft?: boolean
  tags?: string[]
  meta?: Record<string, any>
  complexity?: LessonContentComplexity
  bg_color?: string
}

export interface ILessonUpdate {
  id: string
  name: string
  description: string
  active?: boolean
  duration: string
}

export interface IAddLessonToModule {
  id: string
  lesson_id: string
  sort?: number
}

export interface IRemoveLessonFromModule {
  id: string
  lesson_id: string
}

export interface IUpdateModuleLesson {
  id: string
  lesson_id: string
  sort?: number
}

export interface IAddModuleToCourse {
  id: string
  unit_id: string
}

export interface IRemoveModuleFromCourse {
  id: string
  unit_id: string
}

export interface IModuleCreate {
  active: boolean
  name: string
  description: string
  initial_likes?: number
  initial_stars?: number
  initial_enrolled?: number
  duration?: string
}

export interface ILessonCreate {
  active: boolean
  name: string
  description: string
  duration: string
}
export interface IOpenAiRequest {
  prompt: string
  data?: any
  error?: any
}

export interface IModulesSearchParams extends BaseSearchInterface {
  name?: string
  course_id?: string
  catalog?: boolean
}

export interface ILessonSearchParams extends BaseSearchInterface {
  name?: string
  module_id?: string
  assignment_id?: string
  lessonId?: string
  slug?: string
}

export interface ILessonGenerate {
  lessonPrompt: string
  lessonDuration?: string
  proficiencyLevel?: string
  lessonType?: string
  programmingLanguage?: string
  track?: string
  persona?: string
}

export interface ICourseSearchParams extends BaseSearchInterface {
  class_id?: string
  school_id?: string
  name?: string
  catalog?: boolean
  public?: boolean
}

export interface ICourseCreate {
  name: string
  level: string
  price: string
  description: string
  active: boolean
  draft?: boolean
}

export interface IModuleDelete {
  id: string
}

export interface ILessonDelete {
  id: string
}

export interface ICourseDelete {
  id?: string | null
}
