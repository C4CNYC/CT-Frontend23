import { MutableRefObject } from 'react'

import { EditorView } from '@codemirror/view'
import { Compartment } from '@uiw/react-codemirror'

import {
  COPY_PASTE_EVENT,
  MOVE_CURSOR_EVENT,
  PASTE_SYMBOL_EVENT,
  RESET_LESSON_EVENT,
  UNDO_REDO_EVENT,
  UPDATE_COLORS,
  UPDATE_FONT_SIZE,
  UPDATE_LINE_WRAP,
} from '../events'

import { copyPaste } from './copy-paste'
import { updateLineWrap } from './line-wrap'
import { moveCursor } from './move-cursor'
import { pasteSymbol } from './paste-symbol'
import { resetCodemirror } from './reset-lesson'
import { undoRedo } from './undo-redo'
import { updateColorsCodemirror } from './update-colors'
import { updateFontSizeCodemirror } from './update-font-size'

interface ISetting {
  preloadedCode: string
}

// #TODO better to make config and render
// add and remove from one config

export function initListeners(
  view: EditorView,
  editor: MutableRefObject<any>,
  setting: ISetting,
  lineWrap: Compartment
) {
  window.addEventListener(RESET_LESSON_EVENT, () => {
    resetCodemirror(view, setting?.preloadedCode)
  })
  window.addEventListener(UPDATE_LINE_WRAP, (e: any) => {
    updateLineWrap(view, lineWrap, e.detail.wrap)
  })
  window.addEventListener(UPDATE_FONT_SIZE, (e: any) => {
    updateFontSizeCodemirror(editor, e.detail.size)
  })
  window.addEventListener(UPDATE_COLORS, (e: any) => {
    updateColorsCodemirror(editor, e.detail)
  })
  window.addEventListener(PASTE_SYMBOL_EVENT, (e: any) => {
    pasteSymbol(view, e.detail)
  })
  window.addEventListener(MOVE_CURSOR_EVENT, (e: any) => {
    moveCursor(view, e.detail.left)
  })
  window.addEventListener(UNDO_REDO_EVENT, (e: any) => {
    undoRedo(view, e.detail)
  })
  window.addEventListener(COPY_PASTE_EVENT, (e: any) => {
    copyPaste(view, e.detail.type)
  })
}

export function removeListeners(
  view: EditorView,
  editor: MutableRefObject<any>,
  setting: ISetting
  //  lineWrap: Compartment
) {
  window.removeEventListener(RESET_LESSON_EVENT, () => {
    resetCodemirror(view, setting?.preloadedCode)
  })
  // window.removeEventListener(UPDATE_LINE_WRAP, (e: any) => {
  //   updateLineWrap(view, lineWrap, e.detail.wrap)
  // })
  window.removeEventListener(UPDATE_FONT_SIZE, (e: any) => {
    updateFontSizeCodemirror(editor, e.detail.size)
  })
  window.removeEventListener(UPDATE_COLORS, (e: any) => {
    updateColorsCodemirror(editor, e.detail)
  })
  window.removeEventListener(PASTE_SYMBOL_EVENT, (e: any) => {
    pasteSymbol(view, e.detail.symbol)
  })
  window.removeEventListener(MOVE_CURSOR_EVENT, (e: any) => {
    moveCursor(view, e.detail.left)
  })
  window.removeEventListener(UNDO_REDO_EVENT, (e: any) => {
    undoRedo(view, e.detail.type)
  })
  window.removeEventListener(COPY_PASTE_EVENT, (e: any) => {
    copyPaste(view, e.detail.type)
  })
}
