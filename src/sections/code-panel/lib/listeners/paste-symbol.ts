import { EditorView } from '@codemirror/view'

export function pasteSymbol(view: EditorView, text: string) {
  const cursor = view.state.selection.ranges[0].from
  view.focus()
  view.dispatch({
    changes: {
      from: cursor,
      insert: text,
    },
    selection: { anchor: cursor + text.length },
  })
}
