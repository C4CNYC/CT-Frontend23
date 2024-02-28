import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  amount: {
    top: 0,
    right: 0,
    transform: 'translate(50%, -50%)',
    position: 'absolute',
    background: 'white',
    fontSize: 12,
    color: '#282c34',
    borderRadius: '50%',
    width: '12px',
    height: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
