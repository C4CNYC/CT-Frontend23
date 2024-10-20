import { SxProps, Theme } from '@mui/material'

export interface FormAIGenerateProps {
  RlevelR: string
  RgradesR: string
  RlessonDurationR: string
  RlessonLanguageR: string
  RcustomLanguageR: string
  RprogrammingLanguageR: string
  RtrackR: string
  RpersonaR: string
  RtoneR: string
  RtypeLessonR: string
  RlanguageR: string
  name: string | null
  email: string | null
  RpromptR: string
  RcustomPersonaR: string
  RcustomToneR: string
  RcontextR: string
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
  background: isDark ? '#919EAB52' : '#F0EEEE80',
  color: isDark ? '#C4C4C4' : '#616161',
  borderRadius: '50px !important',
  height: '35px',
  '&>svg': { color: '#616161', marginLeft: '6px' },
  '&.Mui-selected, &.Mui-selected:hover': {
    color: isDark ? '#000' : '#fff',
    backgroundColor: isDark ? '#FBDD3F' : '#0198ED',
    '&>svg': {
      color: isDark ? '#000 !important' : '#FBDD3F !important',
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
  background: '',
  borderRadius: '50px',
  fontSize: '1.2rem',
  '&:hover': {
    color: isDark ? '#FFF' : '#616161',
    background: 'none',
  },
})

export const getNextBtnSx = (isDark: boolean) => ({
  color: 'white',
  backgroundColor: isDark ? '#000' : '#0198ED',
  borderRadius: '50px ',
  fontSize: '1.2rem',
  '&:hover': {
    background: isDark ? '#212121' : '#4CB6F3',
    boxShadow: 'none',
  },
})

export const OPTIONAL_TYPO_STYLES = {
  pl: 2,
  color: '#5C5C5C',
  display: 'flex',
  alignItems: 'baseline',
  gap: 2,
  fontWeight: 400,
}

export const STEP_TYTLE_STYLES = {
  fontSize: { xs: '1.2rem', md: '1.5rem' },
  whiteSpace: 'pre-wrap',
}

export const STEP_CONTAINER_STYLES = {
  gap: 3,
  minHeight: '620px',
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
  flex: '1 1 0px',
  textAlign: 'left',
  gap: 1,
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#0198ED',
  },
  '&.MuiToggleButton-root': {
    border: '1px solid #616161!important',
    fontWeight: 400,
    borderRadius: '20px',
  },
}
export const SIMPLE_GENERATE_TOGLE_GROUP = {
  background: 'transparent',
  border: 'none',
  flexWrap: { xs: 'wrap', md: 'nowrap' },
}

export const LANG_CONT_SX = { flexDirection: 'row', gap: 2, px: 2, pt: 1 }

export const PROMTS_VARIANTS = [
  {
    text: 'ai_gen_simple_step_prompt_1',
    key: 'Python variables with exercises in Armenian',
    icon: 'mdi:console',
    color: '#FBDD3F',
  },
  {
    text: 'ai_gen_simple_step_prompt_2',
    key: '6th graders build weather app with api',
    icon: 'tabler:user-screen',
    color: '#d901ed',
  },
  {
    text: 'ai_gen_simple_step_prompt_3',
    key: 'Nested functions in javascript with exercises and quiz',
    icon: 'mdi:question-box-multiple-outline',
    color: '#EE467A',
  },
  {
    text: 'ai_gen_simple_step_prompt_4',
    key: 'Auto-graded infinite loop exercises',
    icon: 'material-symbols:info-outline',
    color: '#FBDD3F',
  },
]

export const TYPE_LESSON = [
  {
    key: 'simple',
    value: 'ai_gen_type_1_value',
    tooltip: 'ai_gen_type_1_tooltip',
    icon: 'material-symbols:info-outline',
  },
  {
    key: 'exercises',
    value: 'ai_gen_type_2_value',
    tooltip: 'ai_gen_type_2_tooltip',
    icon: 'material-symbols:info-outline',
  },
  {
    key: 'project',
    value: 'ai_gen_type_3_value',
    tooltip: 'ai_gen_type_3_tooltip',
    icon: 'material-symbols:info-outline',
  },
  {
    key: 'Beta',
    value: 'ai_gen_type_4_value',
    tooltip: 'ai_gen_type_5_tooltip',
    icon: 'material-symbols:info-outline',
  },
]

export const PROGRAMMING_LANGUAGE = [
  { key: 'Javascript', value: 'ai_gen_progr_lng_opt_1' },
  { key: 'Python (Brython)', value: 'ai_gen_progr_lng_opt_2' },
  { key: 'HTML/CSS', value: 'ai_gen_progr_lng_opt_3' },
  { key: 'HTML/CSS/JS', value: 'ai_gen_progr_lng_opt_4' },
  { key: 'Kaboom.js', value: 'ai_gen_progr_lng_opt_5' },
]

export const TRACK = [
  { key: 'AI & API', value: 'ai_gen_track_option_1' },
  { key: 'Game-Dev', value: 'ai_gen_track_option_2' },
  { key: 'Web-Dev', value: 'ai_gen_track_option_3' },
  { key: 'Science Class', value: 'ai_gen_track_option_11' },
  { key: 'Data Science', value: 'ai_gen_track_option_4' },
  { key: 'Programming Logic', value: 'ai_gen_track_option_5' },
  { key: 'Math Class', value: 'ai_gen_track_option_6' },
  { key: 'History Class', value: 'ai_gen_track_option_7' },
  { key: 'English Class', value: 'ai_gen_track_option_8' },
  { key: 'Dance Class', value: 'ai_gen_track_option_9' },
  { key: 'Hour of Code', value: 'ai_gen_track_option_10' },
]

export const LEVELS = [
  { key: 'Beginner', value: 'ai_gen_level_1' },
  { key: 'Novice', value: 'ai_gen_level_2' },
  { key: 'Amateur', value: 'ai_gen_level_3' },
  { key: 'Intermediate', value: 'ai_gen_level_4' },
  { key: 'Advanced', value: 'ai_gen_level_5' },
]

export const GRADES = [
  { key: 'Grades 3-4', value: 'ai_gen_grade_1' },
  { key: 'Grades 5-6', value: 'ai_gen_grade_2' },
  { key: 'Grades 7-8', value: 'ai_gen_grade_3' },
  { key: 'Grades 9-10', value: 'ai_gen_grade_4' },
  { key: 'Grades 11-12', value: 'ai_gen_grade_5' },
  { key: '18 +', value: 'ai_gen_grade_6' },
]

export const LESSON_DURARION = [
  { key: '20 Mins', value: 'ai_gen_duration_1' },
  { key: '40 Mins', value: 'ai_gen_duration_2' },
  { key: '60 Mins', value: 'ai_gen_duration_3' },
  { key: '90 Mins', value: 'ai_gen_duration_4' },
  { key: '120 Mins', value: 'ai_gen_duration_5' },
]

export const PERSONA = [
  { key: 'Mumu', value: 'ai_gen_persona_1' },
  { key: 'Winnie the Pooh', value: 'ai_gen_persona_2' },
  //{ key: 'Pirate', value: 'Pirate' },
  { key: 'Benny the Bunny', value: 'ai_gen_persona_3' },
  { key: 'Lulu the Lamb', value: 'ai_gen_persona_4' },
  { key: 'Daisy the Duckling', value: 'ai_gen_persona_5' },
  //{ key: "Ollie the Owl", value: "Ollie the Owl" },
  { key: 'Pip the Penguin', value: 'ai_gen_persona_6' },
  //{ key: "Fuzzy the Bear Cub", value: "Fuzzy the Bear Cub" },
  { key: 'Milo the Mouse', value: 'ai_gen_persona_7' },
  //{ key: "Tilly the Tortoise", value: "Tilly the Tortoise" },
  { key: 'Nina the Squirrel', value: 'ai_gen_persona_8' },
  { key: 'Charlie the Cat', value: 'ai_gen_persona_9' },
]

export const TONE = [
  { key: 'Silly', value: 'ai_gen_persona_tone_1' },
  { key: 'Grumpy', value: 'ai_gen_persona_tone_2' },
  { key: 'Lively', value: 'ai_gen_persona_tone_3' },
  { key: 'Boring', value: 'ai_gen_persona_tone_4' },
]

export const LOADING_STEPS = [
  'ai_gen_loading_state_1',
  'ai_gen_loading_state_2',
  'ai_gen_loading_state_3',
  'ai_gen_loading_state_4',
  'ai_gen_loading_state_5',
  'ai_gen_loading_state_6',
]

export const TYPE_PROJECT = [
  { key: 'simple', value: 'Mini Lesson (1 slide)' },
  { key: 'full', value: 'Complete Lesson' },
  { key: 'Concept & Exercises', value: 'Concept & Exercises' },
  { key: 'Practical Project', value: 'Practical Project' },
  { key: 'Quiz', value: 'Quiz' },
]
