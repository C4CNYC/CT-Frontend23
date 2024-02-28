import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles({
  content: {
    width: 400,
    padding: '20px',
    overflowY: 'scroll',
    maxHeight: '600px',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: '1px',
    right: '3px',
    width: '18px',
    cursor: 'pointer',
  },
  commentWrapper: {
    marginBottom: '8px',
    paddingBottom: '8px',
    borderBottom: '2px solid #C0C0C0',
  },
  lastCommentWrapper: {
    borderBottom: 'none',
    marginBottom: 0,
  },
  commentItem: {
    marginTop: '8px',
  },
  commentTitle: {
    color: '#C0C0C0',
  },
  commentName: {
    fontWeight: 600,
  },
  clearAll: {
    float: 'right',
  },
})
