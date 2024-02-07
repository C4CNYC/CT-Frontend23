import { SxProps, Theme } from '@mui/system'

export const LESSON_LIST_BLOCK_SX = {
  p: 2,
  flex: 1,
  borderRadius: 2,
  boxShadow: 3,
  bgcolor: '#f0f0f0',
  height: '89vh',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: 0,
  },
}

export const getModuleBtnSx = (theme: Theme): SxProps => ({
  width: '100%',
  justifyContent: 'flex-start',
  p: 1.5,
  fontWeight: 500,
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  gap: 1,
  bgcolor: theme.palette.background.default,
})

export const getAddLessonBtnSx = (theme: Theme): SxProps => ({
  mb: 1,
  p: 2,
  gap: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: theme.palette.background.default,
})

export const NO_SELECTED_BOX_SX = {
  display: 'flex',
  flex: 3,
  justifyContent: 'center',
  alignItems: 'center',
  height: '89vh',
  flexWrap: 'wrap',
  flexDirection: 'column',
}

export const LESSON_DETAILS_WRAPPER = {
  display: 'flex',
  gap: 2,
  flex: 3,
}

export const LESSON_DETAILS_BLOCK_SX = {
  p: 2,
  height: '89vh',
  borderRadius: 2,
  flex: 1,
  boxShadow: 3,
}

export const getLessonSettingsBtnSx = (theme: Theme): SxProps => ({
  borderRadius: 8,
  justifyContent: 'flex-start',
  fontWeight: 500,
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  gap: 1,
  borderWidth: 2,
  color: theme.palette.text.secondary,
})

export const DETAILS_LINK_WRAPPER = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  my: 4,
}

export const VIEW_LESSON_LINK_SX = {
  color: '#EE467A',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
}

export const ADD_SLIDE_LINK_SX = {
  color: '#0198ED',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
}
