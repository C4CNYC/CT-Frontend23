import { SxProps, Theme } from '@mui/material'

export interface FormAIGenerateProps {
  RlevelR: string
  RgradesR: string
  RlessonDurationR: string
  RlessonLanguageR: string
  RprogrammingLanguageR: string
  RtrackR: string
  RpersonaR: string
  RtoneR: string
  RtypeLessonR: string
  RlanguageR: string
  name: string | null
  email: string | null
  RpromptR: string
}

export interface AIGenerateStepperProps {
  isModal: boolean
  closeModal?: () => void
}

export interface IAddAddonsProps {
  closeModal?: () => void
  resetRoad: () => void
  onSubmitAddons: (addons: IAddons) => void
}

export interface IAddons {
  quiz: boolean
  autoGrading: boolean
  lessonPlan: boolean
  revision: boolean
}

export const getToggleBtnGroupSx = (isDark: boolean) => ({
  background: isDark ? '#fff' : '#F0EEEE80',
  color: '#616161',
  borderRadius: '50px !important',
  height: '35px',
  '&>svg': { color: '#616161', marginLeft: '6px' },
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#0198ED',
    '&>svg': {
      color: '#FBDD3F !important',
    },
  },
  '&.MuiToggleButton-root': {
    display: 'flex!important',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content!important',
    whiteSpace: 'nowrap',
    minWidth: '100px',
  },
})

export const TOGGLE_BUTTON_GROUP_STYLES = {
  border: 'none',
  background: 'transparent',
  flexWrap: 'wrap',

  maxWidth: { xs: '400px', sm: 'none' },
}

export const getSkipBtnSx = (isDark: boolean) => ({
  color: '#616161',
  background: isDark ? '#fff' : '',
  borderRadius: '50px',
  fontSize: '1.2rem',
  '&:hover': {
    background: '#F0EEEE80',
  },
})

export const NEXT_BUTTON_STYLES = {
  color: 'white',
  backgroundColor: '#0198ED',
  borderRadius: '50px ',
  fontSize: '1.2rem',
  '&:hover': {
    background: '#4CB6F3',
  },
}

export const OPTIONAL_TYPO_STYLES = {
  pl: 2,
  color: '#A6A6A6',
  display: 'flex',
  alignItems: 'baseline',
  gap: 2,
  fontWeight: 400,
}

export const STEP_TYTLE_STYLES = { fontSize: { xs: '1.3rem', md: '1.85rem' } }

export const STEP_CONTAINER_STYLES = {
  minHeight: '770px',
  width: { xs: '300px', sm: '400px', md: 'auto' },
}

export const BTN_CONTAINER_STYLES = {
  marginTop: 'auto',
  gap: 3,
  pr: { xs: 0, sm: 3 },
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'flex-end',
}

export const styledAIRoadInput = (theme: Theme, sx?: SxProps): SxProps => ({
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  '& .MuiInputBase-root': {
    background: theme.palette.mode === 'light' ? '#F0EEEE80' : 'initial',
    borderRadius: '20px',
  },
  '& fieldset': {
    border: theme.palette.mode === 'light' ? 'none' : '',
  },

  ...sx,
})

export const NOTE_DIAMOND_SX = {
  flexDirection: 'row',
  alignItems: 'center',
  background: '#0198ED1A',
  borderRadius: '20px',
  py: 1,
  px: 2,
}

export const SIMPLE_GENERATE_TOGLE = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  gap: 1,
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#0198ED',
  },
  '&.MuiToggleButton-root': {
    border: '2px solid #616161!important',
    fontWeight: 400,
    borderRadius: '20px',
  },
}
export const SIMPLE_GENERATE_TOGLE_GROUP = {
  background: 'transparent',
  border: 'none',
  flexWrap: { xs: 'wrap', md: 'nowrap' },
}

export const PROMTS_VARIANTS = [
  { text: 'Python variables with exercises in Armenian', icon: 'mdi:console', color: '#FBDD3F' },
  { text: '6th graders build weather app with api', icon: 'tabler:user-screen', color: '#d901ed' },
  {
    text: 'Nested functions in javascript with exercises and quiz',
    icon: 'mdi:question-box-multiple-outline',
    color: '#EE467A',
  },
  {
    text: 'Auto-graded infinite loop exercises',
    icon: 'material-symbols:info-outline',
    color: '#FBDD3F',
  },
]

export const TYPE_LESSON = [
  {
    key: 'Simple Lesson ',
    value: 'Simple Lesson',
    tooltip: 'An engaging, single-page lesson with coding exercises.',
    icon: 'material-symbols:info-outline',
  },
  {
    key: 'Concept & Exercises',
    value: 'Concept & Exercises',
    tooltip: 'Learn a concept, then immediately practice it in different ways.',
    icon: 'material-symbols:info-outline',
  },
  {
    key: 'Practical Project',
    value: 'Practical Project',
    tooltip: 'Building a project line by line with explanations and step-by-step guidance.',
    icon: 'material-symbols:info-outline',
  },
]

export const PROGRAMMING_LANGUAGE = [
  { key: 'Javascript', value: 'Javascript' },
  { key: 'Python (Brython)', value: 'Python (Brython)' },
  { key: 'HTML/CSS', value: 'HTML/CSS' },
  { key: 'HTML/CSS/JS', value: 'HTML/CSS/JS' },
  { key: 'Kaboom.js', value: 'Kaboom.js' },
]

export const TRACK = [
  { key: 'AI & API', value: 'AI & API' },
  { key: 'Game-Dev', value: 'Game-Dev' },
  { key: 'Web-Dev', value: 'Web-Dev' },
  { key: 'Data Science', value: 'Data Science' },
  { key: 'Programming Logic', value: 'Programming Logic' },
  { key: 'Math Class', value: 'Math Class' },
  { key: 'History Class', value: 'History Class' },
  { key: 'English Class', value: 'English Class' },
  { key: 'Dance Class', value: 'Dance Class' },
  { key: 'Hour of Code', value: 'Hour of Code' },
]

export const LEVELS = [
  { key: 'Beginner', value: 'Beginner' },
  { key: 'Novice', value: 'Novice' },
  { key: 'Amateur', value: 'Amateur' },
  { key: 'Intermediate', value: 'Intermediate' },
  { key: 'Advanced', value: 'Advanced' },
]

export const GRADES = [
  { key: 'Grades 3-4', value: 'Grades 3-4' },
  { key: 'Grades 5-6', value: 'Grades 5-6' },
  { key: 'Grades 7-8', value: 'Grades 7-8' },
  { key: 'Grades 9-10', value: 'Grades 9-10' },
  { key: 'Grades 11-12', value: 'Grades 11-12' },
  { key: '18 +', value: '18 +' },
]

export const LESSON_DURARION = [
  { key: '20 Mins', value: '20 Mins' },
  { key: '40 Mins', value: '40 Mins' },
  { key: '60 Mins', value: '60 Mins' },
  { key: '90 Mins', value: '90 Mins' },
  { key: '120 Mins', value: '120 Mins' },
]

export const PERSONA = [
  { key: 'Mumu', value: 'Mumu' },
  { key: 'Winnie the Pooh', value: 'Winnie the Pooh' },
  { key: 'Cow', value: 'Cow' },
  { key: 'Jesus', value: 'Jesus' },
  { key: 'Buddha', value: 'Buddha' },
  { key: 'Pirate', value: 'Pirate' },
]

export const TONE = [
  { key: 'Silly', value: 'Silly' },
  { key: 'Grumpy', value: 'Grumpy' },
  { key: 'Lively', value: 'Lively' },
  { key: 'Boring', value: 'Boring' },
]

export const LOADING_STEPS = [
  'Compiling request',
  'Sending request',
  'Confirming receipt',
  'Building the lesson',
  'Receiving the lesson',
  'Finishing up',
]

export const TYPE_PROJECT = [
  { key: 'simple', value: 'Mini Lesson (1 slide)' },
  { key: 'full', value: 'Complete Lesson' },
  { key: 'Exersize', value: 'Exersize' },
  { key: 'Quiz', value: 'Quiz' },
]
