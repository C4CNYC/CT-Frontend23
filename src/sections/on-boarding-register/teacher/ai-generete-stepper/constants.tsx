import { SxProps, Theme } from '@mui/material'
import { BsQuestionSquare } from '@react-icons/all-files/bs/BsQuestionSquare'
import { FaChalkboardUser } from '@react-icons/all-files/fa6/FaChalkboardUser'
import { LuInfo } from '@react-icons/all-files/lu/LuInfo'
import { MdTerminal } from '@react-icons/all-files/md/MdTerminal'
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
  passedValues?: Partial<FormAIGenerateProps>
  props?: { activeStep?: number }
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
  minHeight: '520px',
}

export const BTN_CONTAINER_STYLES = {
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

export const RHFTextFieldInRHFToggleButtonGroup = {
  maxWidth: '200px',
  padding: '4px',
  '& input': {
    padding: '8px 14px ',
    fontSize: '0.875rem',
  },
  '& .MuiInputBase-root': {
    borderRadius: '50px',
  },
}

export const PROMTS_VARIANTS = [
  {
    text: 'ai_gen_simple_step_prompt_1',
    key: 'Python variables with exercises in Armenian',
    icon: (
      <MdTerminal
        color='#FBDD3F'
        size={25}
      />
    ),
  },
  {
    text: 'ai_gen_simple_step_prompt_2',
    key: '6th graders build weather app with api',
    icon: (
      <FaChalkboardUser
        color='#d901ed'
        size={22}
      />
    ),
  },
  {
    text: 'ai_gen_simple_step_prompt_3',
    key: 'Nested functions in javascript with exercises',
    icon: (
      <BsQuestionSquare
        color='#EE467A'
        size={22}
      />
    ),
  },
  {
    text: 'ai_gen_simple_step_prompt_4',
    key: 'Auto-graded infinite loop exercises',
    icon: (
      <LuInfo
        color='#FBDD3F'
        size={22}
      />
    ),
  },
]

export const TYPE_LESSON = [
  {
    key: 'simple',
    value: 'simple',
    tooltip: 'ai_gen_type_1_tooltip',
    icon: <LuInfo size={18} />,
  },
  {
    key: 'exercises',
    value: 'exercises',
    tooltip: 'ai_gen_type_2_tooltip',
    icon: <LuInfo size={18} />,
  } /*
  {
    key: 'project',
    value: 'project',
    tooltip: 'ai_gen_type_3_tooltip',
    icon: 'material-symbols:info-outline',
  },
  {
    key: 'Beta',
    value: 'beta',
    tooltip: 'ai_gen_type_5_tooltip',
    icon: 'material-symbols:info-outline',
  },*/,
]

export const PROGRAMMING_LANGUAGE = [
  { key: 'Javascript', value: 'Javascript' },
  { key: 'Python (Brython)', value: 'Python (Brython)' },
  { key: 'HTML/CSS', value: 'HTML/CSS' },
  { key: 'HTML/CSS/JS', value: 'HTML/CSS/JS' },
  { key: 'Kaboom.js', value: 'Kaboom.js' },
  { key: 'P5.js', value: 'P5.js' },
]

export const TRACK = [
  { key: 'AI & API', value: 'AI & API' },
  { key: 'Game-Dev', value: 'Game-Dev' },
  { key: 'Web-Dev', value: 'Web-Dev' },
  { key: 'Science Class', value: 'Science Class' },
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
  { key: '18+', value: '18+' },
]

export const LESSON_DURARION = [
  { key: '20 Mins', value: '20 Minutes' },
  { key: '40 Mins', value: '40 Minutes' },
  { key: '60 Mins', value: '60 Minutes' },
  { key: '90 Mins', value: '90 Minutes' },
  { key: '120 Mins', value: '120 Minutes' },
]

export const PERSONA = [
  {
    key: 'Mumu is a happy baby tiger that loves teaching kids how to code.',
    value: 'Mumu the Tiger',
  },
  {
    key: 'Winnie the Pooh is a thoughtful bear who adores sharing stories and solving puzzles.',
    value: 'Winnie the Pooh',
  },
  {
    key: 'Benny the Bunny is a curious adventurer who loves hopping into new challenges.',
    value: 'Benny the Bunny',
  },
  {
    key: 'Lulu the Lamb is a gentle guide who enjoys helping kids explore the world of art.',
    value: 'Lulu the Lamb',
  },
  {
    key: 'Daisy the Duckling is a bubbly friend who loves discovering science experiments.',
    value: 'Daisy the Duckling',
  },
  {
    key: 'Pip the Penguin is a cool explorer who enjoys teaching geography and fun facts.',
    value: 'Pip the Penguin',
  },
  {
    key: 'Milo the Mouse is a clever thinker who loves solving riddles and learning math.',
    value: 'Milo the Mouse',
  },
  {
    key: 'Nina the Squirrel is a creative genius who enjoys crafting and making things.',
    value: 'Nina the Squirrel',
  },
  {
    key: 'Charlie the Cat is a tech-savvy feline who loves teaching coding and robotics.',
    value: 'Charlie the Cat',
  },

  //{ key: "Fuzzy the Bear Cub", value: "Fuzzy the Bear Cub" },
  //{ key: "Ollie the Owl", value: "Ollie the Owl" },
  //{ key: "Tilly the Tortoise", value: "Tilly the Tortoise" },
]

export const TONE = [
  { key: 'Silly', value: 'Silly' },
  { key: 'Grumpy', value: 'Grumpy' },
  { key: 'Lively', value: 'Lively' },
  { key: 'Boring', value: 'Boring' },
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

export type IAIPersonaInfoProps = {
  prevStep: () => void
  closeModal?: () => void
  customPersona: boolean
  customTone: boolean
}
