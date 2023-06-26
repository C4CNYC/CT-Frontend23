// import { redo, undo } from "@codemirror/history";
import { EditorView } from "@codemirror/view";
export function undoRedo(view: EditorView, type: string) {
  view.focus();
  if (type === "undo") {
    type = "undo";
  }
  if (type === "redo") {
    type = "redo";
  }
}
