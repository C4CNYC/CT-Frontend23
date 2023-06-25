import { MutableRefObject } from "react";

export function updateFontSizeCodemirror(
  editor: MutableRefObject<any>,
  size: number
) {
  if (!editor.current) return;
  editor.current.style.fontSize = `${size}px`;
}
