import { EditorView } from "@codemirror/view";

export function resetCodemirror(view: EditorView, preloadedCode: string = "") {
  view.dispatch({
    changes: {
      from: 0,
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      to: view.state.doc.toString().length,
      insert: preloadedCode,
    },
  });
  // view.c();
}
