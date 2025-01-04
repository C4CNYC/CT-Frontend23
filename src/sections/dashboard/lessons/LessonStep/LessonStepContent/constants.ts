import { styled, ToggleButtonGroup } from '@mui/material'

export const DEFAULT_COLOR = '' // '#F6F9FC'

export const BTNSX = {
  color: '#364954',
  gap: 0.8,
  fontWeight: 400,
}

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    paddingBottom: 2,
    paddingTop: 2,
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.default,
      color: '#4396e6',
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))
