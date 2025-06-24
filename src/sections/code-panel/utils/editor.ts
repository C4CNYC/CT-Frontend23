import { syntaxTree } from '@codemirror/language'
import { Compartment } from '@codemirror/state'
import { EditorView, KeyBinding } from '@codemirror/view'

export const keymapCompartment = new Compartment()

function getPreviousLineIndent(view: EditorView): string {
  const { state } = view
  const pos = state.selection.main.head
  const currentLine = state.doc.lineAt(pos)

  if (currentLine.number === 1) return ''

  const prevLine = state.doc.line(currentLine.number - 1)
  const match = prevLine.text.match(/^(\s*)/)
  return match ? match[1] : ''
}

export const createCustomKeymap = (autoIndent: boolean = false): KeyBinding[] => [
  {
    key: 'Enter',
    run: (view: EditorView): boolean => {
      if (!autoIndent) {
        view.dispatch(view.state.replaceSelection('\n'))
        return true
      }

      const { state } = view
      const pos = state.selection.main.head
      const tree = syntaxTree(state)
      const nodeBefore = tree.resolve(pos, -1)
      const nodeAfter = tree.resolve(pos, 1)
      const currentIndent = getPreviousLineIndent(view)

      if (
        nodeBefore.name === 'EndTag' &&
        nodeAfter.name === 'StartCloseTag' &&
        // @ts-expect-error
        nodeBefore.parent?.id === nodeAfter.parent?.parent?.id
      ) {
        view.dispatch({
          changes: { from: pos, insert: `\n${currentIndent}  \n${currentIndent}` },
          selection: { anchor: pos + 1 + currentIndent.length + 2 },
        })
      } else {
        view.dispatch(state.replaceSelection('\n' + currentIndent))
      }

      return true
    },
  },
]
