import { AssignmentTypes } from '@/redux/enums/assignment-types.enum'
import { ISkill } from '@/redux/services/interfaces/skill.interface'

export interface FormQuestProps {
  type: AssignmentTypes
  course: string
  classes?: string[] | []
  students?: string[] | []
  name: string
  description?: string
  startDate: string
  dueDate: string
  closeDate: string
  active: boolean
  skill_tags?: ISkill[]
  module?: string
}

export interface IAddQuest {
  assignmentId?: string
  schoolId: string
}
