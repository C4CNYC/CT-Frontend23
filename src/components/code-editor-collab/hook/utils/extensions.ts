import { type Socket, io } from "socket.io-client";
import { type Extension, Compartment } from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { langs } from '@uiw/codemirror-extensions-langs';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { indentUnit } from '@codemirror/language';
import { dracula } from "thememirror";

import { cursorExtension } from "./cursors";
import { peerExtension } from "./peer-extension";
import { BASIC_SETUP } from "../constants";

interface OnInitExtensionsProps {
	version: number
	lineWrap: Compartment
  fileName?: string
  socket: Socket
  onChange?: (code: string) => void
  roomId: string
  cursorId: string
  tooltipText: string
  withTooltip: boolean
}

export const getExtensions = ({
  lineWrap,
  onChange,
  socket,
  roomId,
  version,
  fileName,
  cursorId,
  tooltipText,
  withTooltip,
}: OnInitExtensionsProps): Extension[] => {
  return [
    indentUnit.of("\t"),
    basicSetup(BASIC_SETUP), 
    langs.html(),
    dracula,
    lineWrap.of(EditorView.lineWrapping),
    EditorView.updateListener.of((e) => {
      onChange?.(e.state.doc.toString());
    }),
    peerExtension({
      socket,
      roomId,
      startVersion: version,
      fileName,
    }),
    cursorExtension({
      cursorId,
      tooltipText,
      withTooltip
    })
  ]
}
