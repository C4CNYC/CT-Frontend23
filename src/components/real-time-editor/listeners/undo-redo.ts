import { redo, undo } from "@codemirror/commands";
import { EditorView } from "@codemirror/view";

export function undoRedo(view: EditorView, type: string) {
  view.focus();
  if (type === "undo") {
    undo({
      state: view.state,
      dispatch: view.dispatch,
    });
  }
  if (type === "redo") {
    redo({ state: view.state, dispatch: view.dispatch });
  }
}
