import { selectAll } from "@codemirror/commands";
import { EditorView } from "@codemirror/view";

export async function copyPaste(view: EditorView, type: string) {
  view.focus();
  const cursor = view.state.selection.ranges[0].from;
  if (type === "copy") {
    if (
      view.state.selection.ranges[0].from !== view.state.selection.ranges[0].to
    ) {
      const text = view.state.sliceDoc(
        view.state.selection.ranges[0].from,
        view.state.selection.ranges[0].to
      );
      navigator.clipboard.writeText(text);
    } else {
      navigator.clipboard.writeText("");
    }
  }
  if (type === "paste") {
    const text = await navigator.clipboard.readText();
    if (text) {
      view.dispatch({
        changes: {
          from: cursor,
          insert: text,
        },
        selection: { anchor: cursor + text.length },
      });
    }
  }
  if (type === "select") {
    selectAll(view);
  }
}
