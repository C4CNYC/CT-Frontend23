import { styled } from '@mui/system'

export const CodeEditorBlockWrapper = styled('div')({
  position: 'relative',
  background: '#282c34',
  minHeight: '100%',
})

export const CommentIconWrapper = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(50%, -50%)',
  background: 'white',
  fontSize: 12,
  color: '#282c34',
  borderRadius: '50%',
  width: '12px',
  height: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
