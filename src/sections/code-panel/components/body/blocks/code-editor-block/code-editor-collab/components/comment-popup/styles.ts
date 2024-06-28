import Close from '@mui/icons-material/Close'
import { styled } from '@mui/system'

export const CommentPopupWrapper = styled('div')({
  width: 400,
  padding: '20px',
  overflowY: 'scroll',
  maxHeight: '600px',
  position: 'relative',
})

export const CloseIcon = styled(Close)({
  position: 'absolute',
  top: '1px',
  right: '3px',
  width: '18px',
  cursor: 'pointer',
})

export const CommentWrapper = styled('div')(({ lastItem }: { lastItem: boolean }) => ({
  marginBottom: lastItem ? 'none' : '8px',
  paddingBottom: lastItem ? 'none' : '8px',
  borderBottom: '2px solid #C0C0C0',
}))

export const CommentTitle = styled('div')({
  color: '#C0C0C0',
})

export const CommentItem = styled('div')({
  marginTop: '8px',
})

export const CommentName = styled('span')({ fontWeight: 'bold' })
