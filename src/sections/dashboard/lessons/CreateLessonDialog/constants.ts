import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'

export const _mochLessonTypes = [
  {
    key: LessonType.PRACTICAL,
    value: 'Practical',
    tooltip: 'Building a project line-by-line with explanations and step-by-step guidance.',
  },
  {
    key: LessonType.EXERCISE,
    value: 'Exercises',
    tooltip:
      'Exercises with instructions and examples. Great for reinforcing learning or evaluating competency.',
  },
  {
    key: LessonType.QUIZ,
    value: 'Quiz',
    tooltip: 'Multiple-choice questions to test knowledge and understanding.',
  },
  {
    key: LessonType.OTHER,
    value: 'Other',
    tooltip: 'Any other type of lesson.',
  },
  {
    key: LessonType.START_PROJECT,
    value: 'Start of Project',
    tooltip:
      'The beginning lesson of a project. Subsequent lessons will build on the code typed here.',
  },
  {
    key: LessonType.PART_PROJECT,
    value: 'Part of Project',
    tooltip:
      'Build things with this lesson type: The code you type in one lesson, flows to the next, if the lesson is completed.',
  },
]

export const _mochGradingMethods = [
  {
    key: 'autoRun',
    value: 'Auto-run Code',
    tooltip: 'Automatically run the code whenever the student makes any edits to the code.',
  },
  {
    key: 'manual',
    value: 'Manual Run Button',
    tooltip: 'Run the code manually by clicking the run button.',
  },
]

export const TYPO_TOGGLE_BTN_SX = {
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: 1,
  mb: -1,
  ml: 1,
  mt: '1rem',
  color: '#5C5C5C',
}

export const GRADING_METHODS_BTN_SX = {
  gap: 1,
  m: { xs: 'auto', md: '0 !important' },
  padding: '0.3rem 0.8rem',
  flexGrow: 1,

  '&.Mui-selected, &.Mui-selected:hover': {
    background: 'rgb(117, 202, 103)',
    color: '#fff',
  },
}
