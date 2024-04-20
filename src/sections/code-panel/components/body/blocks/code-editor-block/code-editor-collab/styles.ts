import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    background: '#282c34',
    minHeight: '100%',

    '& .cm-line': {
      position: 'relative',
    },
  },
  popover: {
    position: 'static',
    '& .MuiPaper-root': {
      background: '#282c34',
      borderRadius: '8px',
    },
  },
})
