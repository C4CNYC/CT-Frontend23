import { LanguageSupport, indentUnit } from "@codemirror/language";
import { Compartment, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { langs } from "@uiw/codemirror-extensions-langs";
import { type Socket } from "socket.io-client";
import { dracula } from "thememirror";

import { commentsExtension } from "../../../../codemirror/extensions/comments";
import { contextMenuExtension } from "../../../../codemirror/extensions/context-menu";
import { cursorExtension } from "../../../../codemirror/extensions/cursors";
import { getExtension } from "../../components/file-modal/utils";
import { BASIC_SETUP, Extensions } from "../constants";
import { peerExtension } from "./peer-extension";

const langMap = {
  [Extensions.Css]: () => langs.css(),
  [Extensions.Html]: () => langs.html(),
  [Extensions.Js]: () => langs.javascript(),
};

const language = (fileName: string): LanguageSupport[] => {
  const extension = getExtension(fileName);

  if (extension == null) {
    return [];
  }

  return [langMap[extension as keyof typeof langMap]()];
};

interface OnInitExtensionsProps {
  version: number;
  lineWrap: Compartment;
  fileName?: string;
  socket: Socket;
  onChange?: (code: string) => void;
  roomId: string;
  userId: string;
  cursorId: string;
  tooltipText: string;
  withTooltip: boolean;
}

export const getExtensions = ({
  lineWrap,
  onChange,
  socket,
  roomId,
  userId,
  version,
  fileName,
  cursorId,
  tooltipText,
  withTooltip,
}: OnInitExtensionsProps): Extension[] => {
  return [
    indentUnit.of("\t"),
    basicSetup(BASIC_SETUP),
    ...language(fileName ?? ""),
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
    cursorExtension(cursorId),
    commentsExtension(userId),
    contextMenuExtension(userId),
  ];
};
