import { EditorView } from "@codemirror/view";

export function pasteSymbol(view: EditorView, text: Record<string, string>) {
  const cursor = view.state.selection.ranges[0].from;

  view.focus();
  view.dispatch({
    changes: {
      from: cursor,
      insert: text.symbol,
    },
    selection: { anchor: cursor + text.symbol.length },
  });
}
