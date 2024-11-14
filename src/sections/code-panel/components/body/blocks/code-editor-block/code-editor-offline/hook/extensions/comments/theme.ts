import { EditorView } from '@uiw/react-codemirror'

export const cursorBaseTheme = EditorView.baseTheme({
  '.comment-icon': {
    cursor: 'pointer',

    '& path': {
      fill: 'white',
    },
  },
})
