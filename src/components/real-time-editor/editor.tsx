import { useEffect, useRef } from "react";

import { indentUnit } from "@codemirror/language";
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { langs } from "@uiw/codemirror-extensions-langs";
import { Socket } from "socket.io-client";
import { dracula } from "thememirror";

import { State } from ".";
import { initListeners, removeListeners } from "./listeners";
import { peerExtension } from "../../codemirror/extensions/collab";
import { cursorExtension } from "../../codemirror/extensions/cursors";

interface IEditor {
  roomId?: string;
  state?: State;
  cursorId?: string;
  cursorText?: string;
  preloadedCode: string;
  onChangeCode: (code: string) => void;
  socket?: Socket;
  code: string;
}

export const CodeEditor = ({
  roomId,
  preloadedCode,
  state,
  cursorId,
  cursorText,
  onChangeCode,
  socket,
  code,
}: IEditor): React.ReactElement => {
  const editor = useRef();
  const lineWrap = new Compartment();
  useEffect(() => {
    const startState = EditorState.create({
      doc: state?.doc,
      extensions: [
        EditorView.updateListener.of(function (e) {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          onChangeCode(e.state.doc.toString());
        }),
        dracula,
        indentUnit.of("\t"),
        basicSetup({
          highlightActiveLineGutter: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }),
        lineWrap.of(EditorView.lineWrapping),
        langs.html(),
        ...(socket && state && cursorId && roomId
        ? [
          peerExtension(socket, state.version ?? 0, cursorId, roomId),
          cursorExtension(cursorText ?? cursorId)
        ]
        : [])
      ],
    });

    let view: EditorView;

    setTimeout(() => {
      view = new EditorView({ state: startState, parent: editor.current });

      if (!state?.doc?.toString()) {
        view.dispatch({
          changes: {
            from: view.state.doc.length,
            insert: code || preloadedCode,
          },
        });
      }
      initListeners(
        view,
        editor,
        {
          preloadedCode,
        },
        lineWrap
      );
    }, 500);

    return () => {
      removeListeners(
        view,
        editor,
        {
          preloadedCode,
        },
        lineWrap
      );
      view?.destroy();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <div ref={editor}></div>;
};
