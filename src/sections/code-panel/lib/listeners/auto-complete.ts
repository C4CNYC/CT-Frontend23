import { autocompletion } from '@codemirror/autocomplete'
import { closeBrackets } from '@codemirror/autocomplete'
import { html } from '@codemirror/lang-html'
import { Compartment } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

import { indentCompartment, noAutoIndent } from '@/sections/code-panel/utils/editor'

export function updateAutoComplete(
  view: EditorView,
  lineWrap: Compartment,
  isAutoComplete: boolean
) {
  if (isAutoComplete) {
    view.dispatch({
      effects: [
        lineWrap.reconfigure([autocompletion(), html(), closeBrackets()]),
        indentCompartment.reconfigure([]),
      ],
    })
  } else {
    view.dispatch({
      effects: [lineWrap.reconfigure([]), indentCompartment.reconfigure(noAutoIndent)],
    })
  }
}
