import { Socket } from "socket.io-client";
import { useCallback, useState } from "react";
import { dracula } from "thememirror";
import { LanguageSupport, indentUnit } from "@codemirror/language";
import { Compartment, EditorView, Extension, StateEffect } from "@uiw/react-codemirror";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { langs } from "@uiw/codemirror-extensions-langs";

import { getFileExtension } from "src/utils/getFileExtension";

import { type Cursor, cursorExtension } from "./utils/collab/cursors";
import { File, getDocument } from "./utils/collab/requests";
import { peerExtension } from "./utils/collab/peer-extension";
import { BASIC_SETUP, Extensions } from "./constants";
import { useAuthContext } from "../../../auth/useAuthContext";

const langMap = {
  [Extensions.Css]: () => langs.css(),
  [Extensions.Html]: () => langs.html(),
  [Extensions.Js]: () => langs.javascript()
}

const language = ({ name }: File): LanguageSupport[] => {
  const extension = getFileExtension(name);

  return extension != null
    ? [langMap[extension as keyof typeof langMap]()]
    : [];
}

interface UseBaseInit {
  socket: Socket
  withTooltip: boolean
  onChange?: (code: Record<string, string>) => void
  roomId: string
  cursorText: string
  defaultFileName: string
  preloadedCode?: string
}

export interface UseBaseInitReturn {
  key: number
  doc: string
  isLoading: boolean
  extensions?: Extension[]
  baseInit: (fileName: File) => Promise<void>
  setIsLoading: (isLoading: boolean) => void
}

export const useInitCodemirror = ({
  socket,
  withTooltip,
  onChange,
  roomId,
  cursorText,
  defaultFileName,
  preloadedCode,
}: UseBaseInit): UseBaseInitReturn => {
  const [key, setKey] = useState(0);
  const [doc, setDoc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [extensions, setExtensions] = useState<Extension[] | undefined>();
  const { user } = useAuthContext();

  const baseInit = useCallback(async (fileName: File) => {
    const lineWrap = new Compartment();
    const addCursor = StateEffect.define<Cursor>();

    const { version, doc, cursorName, docInfo } = await getDocument({
      roomId,
      fileName,
      socket,
      cursorName: user?.id ?? cursorText,
      defaultFileName,
      preloadedCode,
    });

    setExtensions([
      indentUnit.of("\t"),
      basicSetup(BASIC_SETUP),
      ...language(fileName),
      dracula,
      lineWrap.of(EditorView.lineWrapping),
      peerExtension({
        socket,
        roomId,
        startVersion: version,
        fileName,
        addCursor
      }),
      cursorExtension({
        cursorId: cursorName,
        tooltipText: cursorText,
        withTooltip,
        addCursor,
        userId: user?.id,
      })
    ]);
    onChange?.(docInfo)
    setDoc(doc.toString());
    setKey((prev) => ++prev);
    setIsLoading(false);
  }, [
    roomId,
    cursorText,
    withTooltip,
    socket,
    onChange,
    defaultFileName
  ]);

  return {
    key,
    extensions,
    doc,
    isLoading,
    baseInit,
    setIsLoading
  }
}
