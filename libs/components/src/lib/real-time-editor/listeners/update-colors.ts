import { MutableRefObject } from "react";

export function updateColorsCodemirror(
  editor: MutableRefObject<any>,
  data: { background: string; text: string }
) {
  if (!editor.current) return;
  editor.current.style.backgroundColor = data.background;
  editor.current.style.color = data.text;
}
