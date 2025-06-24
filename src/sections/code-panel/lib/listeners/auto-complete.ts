import { autocompletion } from '@codemirror/autocomplete'
import { closeBrackets } from '@codemirror/autocomplete'
import { html } from '@codemirror/lang-html'
import { Compartment } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'

import { createCustomKeymap, keymapCompartment } from '@/sections/code-panel/utils/editor'

export function updateAutoComplete(
  view: EditorView,
  lineWrap: Compartment,
  isAutoComplete: boolean
) {
  if (isAutoComplete) {
    view.dispatch({
      effects: [
        lineWrap.reconfigure([autocompletion(), html(), closeBrackets()]),
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
