import { BaseSearchInterface } from '@/utils'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'

import { AssignmentProjectLanguages } from '../enums/assignment-types.enum'
import { IStudent } from '../services/interfaces/user.interface'
import { ISchool } from '../slices/global'

import { ICourseElement } from './content.interface'

export interface IClass {
  description?: string
  name: string
  active?: boolean
  students?: IStudent[]
  setting: IClassSettings
  school?: ISchool
  courses?: ICourseElement[]
  avatar?: string
  cover?: string
  id: string
  mentors?: IMentor[]
  total_students?: string
  total_courses?: string
}

export interface IClassProgressLesson {
  id: string
  name: string
  progress: number
  core: boolean
  autoGraded: boolean
  type: LessonType
  slides: Array<{
    id: string
    name: string
    description: string
    progress: 'done' | 'not done' | 'in progress'
  }>
}

export interface IClassProgressModule {
  id: string
  name: string
  description: string
  progress: number
  core: boolean
  autoGraded: boolean
  lessons: IClassProgressLesson[]
}

export interface IClassProgressCourse {
  id: string
  content_id: string
  name: string
  description: string
  due_date: string
  progress: number
  core: boolean
  autoGraded: boolean
  modules: IClassProgressModule[]
}

export interface IClassProgress {
  id: string
  first_name: string
  last_name: string
  username: string
  courses: IClassProgressCourse[]
}

interface ClassProgressAssignments {
  active: boolean
  category: string
  start_date: string
  close_date: string
  end_date: string
  course: {
    id: string
    createdAt: string
    updatedAt: string
    active: boolean
    public: boolean
    catalog: boolean
    userId: string | null
    draft: boolean
    name: string
    price: string
    content_id: string
    level: string
    customLevel: string | null
    age: string
    customAge: string | null
    description: string
    cover: string | null
    preview: string | null
    initial_enrolled: number
    initial_likes: number
    initial_stars: number
    audience: string | null
    for_teachers: string | null
    is_global: boolean
    units: Array<{
      id: string
      createdAt: string
      updatedAt: string
      active: boolean
      name: string
      avatar: string | null
      background: string | null
      initial_enrolled: number
      initial_likes: number
      initial_stars: number
      description: string
      tips: any[]
      duration: {
        hours: number
        minutes: number
      }
      sort: number
      level: string
      customLevel: string | null
      age: string
      customAge: string | null
      grading: string
      brief: string | null
      audience: string | null
      teacher_forum: string | null
      lesson_plans: string | null
      teacher_slides: string | null
      meta: Record<string, any>
      lessons: Array<{
        id: string
        createdAt: string
        updatedAt: string
        active: boolean
        draft: boolean
        name: string
        auto_graded: boolean
        core: boolean
        type: string
        description: string
        head: string
        userId: string
        tips: any[]
        duration: {
          minutes: number
        }
        independent: boolean
        slug: string
        meta: Record<string, any>
      }>
    }>
  } | null
  courseUnitId: string
  id: string
  name: string
  description?: string
  language: AssignmentProjectLanguages

  // relationships
  lessonId?: string

  // metadata
  createdAt: string
  updatedAt: string
  status: string
  type: string
}
export interface ClassProgressResult {
  classInfo: {
    id: string
    name: string
    description: string
    avatar: string
    color: string
    active: boolean
    assigments: ClassProgressAssignments[]
  }
  progressData: Array<{
    student_id: string
    lesson_id: string
    completed_count: string
  }>
}

export interface IClassSettings {
  request_join_enable: boolean
  share_token: string
}

export interface IMentor {
  id: string
  email: string
  role: string
  first_name: string
  avatar: string | null
  last_name: string
  verified: boolean
  active: boolean
}

export interface ClassSearchParams extends BaseSearchInterface {
  name?: string
}

export interface IAddCourseToClass {
  id: string
  course_id: string
}

export interface IRemoveCourseFromClass {
  id: string
  course_id: string
}
