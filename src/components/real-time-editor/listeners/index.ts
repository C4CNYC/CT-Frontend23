import { MutableRefObject } from "react";

import { Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

import { COPY_PASTE_EVENT } from "../events/copy-paste";
import { MOVE_CURSOR_EVENT } from "../events/move-cursor-event";
import { PASTE_SYMBOL_EVENT } from "../events/paste-sumbol.event";
import { RESET_LESSON_EVENT } from "../events/reset-lesson.event";
import { UNDO_REDO_EVENT } from "../events/undo-redo-event";
import { UPDATE_COLORS } from "../events/update-colors.event";
import { UPDATE_FONT_SIZE } from "../events/update-font-size.event";
import { UPDATE_LINE_WRAP } from "../events/update-line-wrap.event";
import { copyPaste } from "./copy-paste";
import { updateLineWrap } from "./line-wrap";
import { moveCursor } from "./move-cursor";
import { pasteSymbol } from "./paste-symbol";
import { resetCodemirror } from "./reset-lesson";
import { undoRedo } from "./undo-redo";
import { updateColorsCodemirror } from "./update-colors";
import { updateFontSizeCodemirror } from "./update-font-size";

interface ISetting {
  preloadedCode: string;
}

let onReset: any;
let onUpdateLine: any;
let onUpdateFont: any;
let onUpdateColor: any;
let onSymbol: any;
let onMoveCursor: any;
let onUndoRedo: any;
let onCopy: any;

// #TODO better to make config and render
// add and remove from one config

export function initListeners(
  view: EditorView,
  editor: MutableRefObject<any>,
  setting: ISetting,
  lineWrap: Compartment
) {
  onReset = () => {
    resetCodemirror(view, setting?.preloadedCode);
  }
  onUpdateLine = (e: any) => {
    updateLineWrap(view, lineWrap, e.detail.wrap);
  }
  onUpdateFont = (e: any) => {
    updateFontSizeCodemirror(editor, e.detail.size);
  }
  onUpdateColor = (e: any) => {
    updateColorsCodemirror(editor, e.detail);
  }
  onSymbol = (e: any) => {
    pasteSymbol(view, e.detail);
  }
  onMoveCursor = (e: any) => {
    moveCursor(view, e.detail.left);
  }
  onUndoRedo = (e: any) => {
    undoRedo(view, e.detail.type);
  }
  onCopy = (e: any) => {
    copyPaste(view, e.detail.type);
  }

  window.addEventListener(RESET_LESSON_EVENT, onReset);
  window.addEventListener(UPDATE_LINE_WRAP, onUpdateLine);
  window.addEventListener(UPDATE_FONT_SIZE, onUpdateFont);
  window.addEventListener(UPDATE_COLORS, onUpdateColor);
  window.addEventListener(PASTE_SYMBOL_EVENT, onSymbol);
  window.addEventListener(MOVE_CURSOR_EVENT, onMoveCursor);
  window.addEventListener(UNDO_REDO_EVENT, onUndoRedo);
  window.addEventListener(COPY_PASTE_EVENT, onCopy);
}

export function removeListeners() {
  window.removeEventListener(RESET_LESSON_EVENT, onReset);
  window.removeEventListener(UPDATE_LINE_WRAP, onUpdateLine);
  window.removeEventListener(UPDATE_FONT_SIZE, onUpdateFont);
  window.removeEventListener(UPDATE_COLORS, onUpdateColor);
  window.removeEventListener(PASTE_SYMBOL_EVENT, onSymbol);
  window.removeEventListener(MOVE_CURSOR_EVENT, onMoveCursor);
  window.removeEventListener(UNDO_REDO_EVENT, onUndoRedo);
  window.removeEventListener(COPY_PASTE_EVENT, onCopy);
}
