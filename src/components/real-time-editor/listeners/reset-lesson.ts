import { EditorView } from '@codemirror/view'

export function resetCodemirror(view: EditorView, preloadedCode = '') {
  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.toString().length,
      insert: preloadedCode,
    },
  })
  // view.c();
}
