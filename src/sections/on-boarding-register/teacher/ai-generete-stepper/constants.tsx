import { SxProps, Theme } from '@mui/material'

export const TOGGLE_BUTTON_STYLES = {
  background: '#F0EEEE80',
  color: '#616161',
  borderRadius: '50px !important',
  height: '40px',
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#0198ED',
  },
}
export const TOGGLE_BUTTON_GROUP_STYLES = {
  border: 'none',
  background: 'transparent',
  flexWrap: 'wrap',
}

export const SKIP_BUTTON_STYLES = {
  color: '#616161',
  borderRadius: '50px',
  fontSize: '1.2rem',
  '&:hover': {
    background: '#F0EEEE80',
  },
}

export const NEXT_BUTTON_STYLES = {
  color: 'white',
  backgroundColor: '#0198ED',
  borderRadius: '50px ',
  fontSize: '1.2rem',
  '&:hover': {
    background: '#4CB6F3',
  },
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

export const LANGUAGE = [
  { key: 'Javascript', value: 'Javascript' },
  { key: 'Python (Brython)', value: 'Python (Brython)' },
  { key: 'HTML/CSS', value: 'HTML/CSS' },
  { key: 'HTML/CSS/JS', value: 'HTML/CSS/JS' },
  { key: 'Kaboom.js', value: 'Kaboom.js' },
]
export const LESSON_DURARION = [
  { key: '20 Mins', value: '20 Mins' },
  { key: '40 Mins', value: '40 Mins' },
  { key: '60 Mins', value: '60 Mins' },
  { key: '90 Mins', value: '90 Mins' },
  { key: '120 Mins', value: '120 Mins' },
]
export const TRACK = [
  { key: 'AI & API', value: 'AI & API' },
  { key: 'Game-Dev', value: 'Game-Dev' },
  { key: 'Web-Dev', value: 'Web-Dev' },
  { key: 'Data Science', value: 'Data Science' },
  { key: 'Science Class', value: 'Science Class' },
  { key: 'Math Class', value: 'Math Class' },
  { key: 'History Class', value: 'History Class' },
  { key: 'English Class', value: 'English Class' },
  { key: 'Other', value: 'Other' },
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
export const TYPE_PROJECT = [
  { key: 'simple', value: 'Mini Lesson (1 slide)' },
  { key: 'full', value: 'Complete Lesson' },
  { key: 'Exersize', value: 'Exersize' },
  { key: 'Quiz', value: 'Quiz' },
]
