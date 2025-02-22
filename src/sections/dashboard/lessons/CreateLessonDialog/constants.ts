import { LessonLanguage } from '@root/src/redux/services/enums/lesson-language.enum'
import { LessonTypeEnum } from '@root/src/redux/services/enums/lesson-type.enum'

export interface FormValuesProps {
  name: string
  description: string
  active: boolean
  head?: string
  duration: number
  type: LessonTypeEnum
  language: LessonLanguage
  slug: string
  grading_method: string
  lock: boolean
}

export interface IDefaultProps {
  name: string
  description: string
  type: LessonTypeEnum
  active: boolean
  head?: string
  duration?: Record<string, number> | null | undefined
  slug?: string
  lock?: boolean
}

export interface ICreateLessonDialogProps {
  defaultValues?: IDefaultProps
  children: React.ReactElement
  isEdit?: boolean
  id?: string
  contentId?: string
  refetch?: () => void
}

export const _mochLessonTypes = [
  {
    key: LessonTypeEnum.practical,
    value: 'Practical',
    tooltip: 'Building a project line-by-line with explanations and step-by-step guidance.',
  },
  {
    key: LessonTypeEnum.exercise,
    value: 'Exercises',
    tooltip:
      'Exercises with instructions and examples. Great for reinforcing learning or evaluating competency.',
  },
  {
    key: LessonTypeEnum.quiz,
    value: 'Quiz',
    tooltip: 'Multiple-choice questions to test knowledge and understanding.',
  },
  {
    key: LessonTypeEnum.other,
    value: 'Other',
    tooltip: 'Any other type of lesson.',
  },
  {
    key: LessonTypeEnum.start_project,
    value: 'Start of Project',
    tooltip:
      'The beginning lesson of a project. Subsequent lessons will build on the code typed here.',
  },
  {
    key: LessonTypeEnum.part_project,
    value: 'Part of Project',
    tooltip:
      'Build things with this lesson type: The code you type in one lesson, flows to the next, if the lesson is completed.',
  },
]

export const _mochGradingMethods = [
  {
    key: 'autoRun',
    value: 'Auto-run Code',
    tooltip: 'Automatically run the code when student write in code-editor.',
  },
  {
    key: 'manual',
    value: 'Manual Run Button',
    tooltip: 'Run the code manually by clicking the run button.',
  },
]

export const languageOptionsParser = (option: string): string => {
  if (option.includes('_')) {
    return option.split('_').join('/').toUpperCase()
  }
  if (option.includes('.')) {
    return option
  }
  return option.charAt(0).toUpperCase() + option.slice(1)
}

export const timeConvertorToSeconds = (time: Record<string, number> | null | undefined) => {
  if (time) {
    return Object.entries(time).reduce((acc, [timeTipe, time]) => {
      if (timeTipe === 'minutes') {
        return (acc += time)
      }
      return (acc += time * 60 + acc * 60)
    }, 0)
  }
  return 0
}

export const TYPO_TOGGLE_BTN_SX = {
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: 1,
  mb: -1,
  ml: 1,
  color: '#5C5C5C',
}

export const GRADING_METHODS_BTN_SX = {
  gap: 1,
  m: '0 !important',
  padding: '0.3rem 0.8rem',

  '&.Mui-selected, &.Mui-selected:hover': {
    background: 'rgb(117, 202, 103)',
    color: '#fff',
  },
}
