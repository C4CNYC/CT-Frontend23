import { EditorView } from "@codemirror/view";

export function moveCursor(view: EditorView, left: Record<string, string>) {
  const cursor = view.state.selection.ranges[0].from;
  view.focus();

  if (left) {
    if (cursor === 0) {
      return;
    }
    view.dispatch({
      selection: { anchor: cursor - 1, head: cursor - 1 },
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (cursor === view.state.doc.toString().length) {
      return;
    }
    view.dispatch({
      selection: { anchor: cursor + 1, head: cursor + 1 },
    });
  }
}
