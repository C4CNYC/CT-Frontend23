import { styled } from '@mui/system'

export const CodeEditorBlockWrapper = styled('div')({
  position: 'relative',
  background: '#282c34',
  minHeight: '100%',

  '& .cm-line': {
    position: 'relative',
  },
})
