import { AssignmentProjectCategories, AssignmentTypes } from '@/redux/enums/assignment-types.enum'
import { ISkill } from '@/redux/interfaces/content.interface'
import { ICourse } from '@/types'
import { BaseSearchInterface } from '@/utils'

import { Status } from '../enums/assignments.enum'

import { IClass } from './class.interface'

export interface IAssignmentReduced {
  id: string
  createdat: string
  name: string
  type: AssignmentTypes
  status: string
  duration: null | string
  start_date: string
  end_date: string
  close_date: string
  courseid: string
  course_progress: null
  pined: string
  pined_assignment_id: string
}

export interface IAssignmentFull {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  description: string
  type: AssignmentTypes
  status: string
  duration: null | string
  active: boolean
  start_date: string
  end_date: string
  close_date: string
  meta: Record<string, any>
  course: ICourse
  skill_tags: ISkill[]
  assignee_classes: IClass[]
  courseUnit?: ICourse
  lessonId?: string
  language?: string
  category?: AssignmentProjectCategories
}

export interface IAssignmentUpdate {
  createdAt?: string
  updatedAt?: string
  name?: string
  description?: string
  type?: string
  status?: Status
  active?: boolean
  start_date?: string | Date
  end_date?: string | Date
  close_date?: string
  duration?: string
  meta?: Record<string, any>
  tags?: string[] | []
  skill_tags?: ISkill[]
  courseUnitId?: string | undefined
  lessonId?: string | undefined
  language?: string
  category?: AssignmentProjectCategories
}

export interface IAssignmentCreate {
  name: string
  description?: string
  type?: string
  start_date?: string
  end_date?: string
  close_date?: string
  classes?: string[]
  students?: string[]
  active?: boolean
  meta?: Record<string, any>
  tags?: string[] | []
  skill_tags: string[]
  courseUnitId: string | undefined
  lessonId: string | undefined
  language?: string
  category?: AssignmentProjectCategories
}

export interface IAssignmetsSearchParams extends BaseSearchInterface {}
