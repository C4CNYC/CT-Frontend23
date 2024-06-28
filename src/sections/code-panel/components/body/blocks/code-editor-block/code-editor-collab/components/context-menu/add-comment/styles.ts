import { styled } from '@mui/system'

export const CodeEditorBlockWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'row',
  padding: '16px',
  '& textarea': {
    borderRadius: '6px',
    border: '1px solid #00B8D9',
    outline: 'none',
    padding: '10px',
    width: '200px',
    resize: 'none',
    background: 'transparent',
    color: '#00B8D9',
    marginRight: '8px',
    '&::placeholder': {
      color: 'rgba(0, 184, 217, 0.6)',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },
})
