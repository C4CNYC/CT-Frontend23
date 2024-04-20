import { styled } from '@mui/material/styles'
import { MaterialDesignContent } from 'notistack'

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  const lightMode = theme.palette.mode === 'light'

  return {
    '& #notistack-snackbar': {
      ...theme.typography.subtitle2,
      padding: 1,
      flexGrow: 1,
    },
    '& .go703367398': {
      marginRight: 0,
    },
    '&.notistack-MuiContent': {
      width: '100%',
      padding: theme.spacing(1),
      margin: theme.spacing(0.25, 0),
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      color: !lightMode ? theme.palette.common.white : theme.palette.grey[800],
      backgroundColor: !lightMode ? theme.palette.grey[900] : theme.palette.common.white,
    },
    '&.notistack-MuiContent-default': {
      padding: theme.spacing(1, 2, 1, 1),
      color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
      backgroundColor: lightMode ? theme.palette.grey[800] : theme.palette.common.white,
    },
    // '&.notistack-MuiContent-info': {},
    // '&.notistack-MuiContent-success': {},
    // '&.notistack-MuiContent-warning': {},
    // '&.notistack-MuiContent-error': {},
  }
})
