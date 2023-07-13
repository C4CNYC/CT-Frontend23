import { Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export function updateLineWrap(
  view: EditorView,
  lineWrap: Compartment,
  wrap: boolean
) {
  if (wrap) {
    view.dispatch({ effects: lineWrap.reconfigure(EditorView.lineWrapping) });
  } else {
    view.dispatch({ effects: lineWrap.reconfigure([]) });
  }
}
