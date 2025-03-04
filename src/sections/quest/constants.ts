import { SxProps, Theme } from '@mui/system'

export const getQuestCardWrapperSx = (theme: Theme): SxProps => ({
  mt: 3,
  p: { xs: '5px 12px', sm: '15px 20px', md: '15px 20px' },
  borderRadius: 2,
  backgroundColor: theme.palette.background.default,
})

export const QUEST_LINK_SX = {
  color: '#EE467A',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
}

export const QUEST_DIVIDER = {
  display: { xs: 'none', sm: 'block' },
  borderStyle: 'dashed',
  borderRightWidth: '2px',
}
