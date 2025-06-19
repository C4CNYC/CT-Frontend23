// import { autocompletion } from '@codemirror/autocomplete'
import { html } from '@codemirror/lang-html'
// import { indentOnInput } from '@codemirror/language'
import { Compartment } from '@codemirror/state'
import { EditorView, keymap, KeyBinding } from '@codemirror/view'

import { keymapCompartment } from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/useInitCodemirror'

// import { closeBrackets } from '@codemirror/autocomplete'

const customKeymap: KeyBinding[] = [
  {
    key: 'Enter',
    run: (view) => {
      view.dispatch(view.state.replaceSelection('\n'))
      return true
    },
  },
]

export function updateAutoComplete(
  view: EditorView,
  lineWrap: Compartment,
  isAutoComplete: boolean
) {
  if (isAutoComplete) {
    view.dispatch({
      effects: [
        lineWrap.reconfigure([
          // indentOnInput(),
          // autocompletion(),
          html(),
        ]),
        keymapCompartment.reconfigure(keymap.of(createCustomKeymap(true))),
      ],
    })
  } else {
    view.dispatch({
      effects: [
        lineWrap.reconfigure([]),
        keymapCompartment.reconfigure(keymap.of(createCustomKeymap(false))),
      ],
    })
  }
}

function getPreviousLineIndent(view: EditorView): string {
  const { state } = view
  const pos = state.selection.main.head
  const currentLine = state.doc.lineAt(pos)

  if (currentLine.number === 1) return ''

  const prevLine = state.doc.line(currentLine.number - 1)
  const match = prevLine.text.match(/^(\s*)/)
  return match ? match[1] : ''
}

export const createCustomKeymap = (autoIndent: boolean = false) => [
  {
    key: 'Enter',
    run: (view: EditorView) => {
      if (autoIndent) {
        const indent = getPreviousLineIndent(view)
        view.dispatch(view.state.replaceSelection('\n' + indent)) // ВИПРАВЛЕНО!
      } else {
        view.dispatch(view.state.replaceSelection('\n'))
      }
      return true
    },
  },
]
