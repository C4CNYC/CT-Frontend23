/* eslint-disable @typescript-eslint/ban-tslint-comment */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { defaultKeymap } from "@codemirror/commands";
import { useEffect, useRef } from "react";

import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { langs } from "@uiw/codemirror-extensions-langs";
import { Socket } from "socket.io-client";

import { voidFunction } from "@utils";

import { State } from "../../sections/teacher-panel/code-panel/work-space/blocks/code-editor-block";
import { peerExtension } from "../../codemirror/extensions/collab";
import { cursorExtension } from "../../codemirror/extensions/cursors";

interface IEditor {
  roomId: string;
  state: State;
  cursorId: string;
  cursorText: string;
  onChangeCode: (code: string) => void;
  socket: Socket;
}

export const CodeEditor = ({
  roomId,
  state,
  cursorId,
  cursorText,
  onChangeCode,
  socket,
}: IEditor): React.ReactElement => {
  const editor = useRef();

  useEffect(() => {
    setTimeout(() => {
      voidFunction();
    }, 500);
    const startState = EditorState.create({
      doc: state.doc,
      extensions: [
        EditorView.updateListener.of(function (e) {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          onChangeCode(e.state.doc.toString());
        }),
        /* tslint:disable */
        // keymap.of(defaultKeymap),
        indentUnit.of("\t"),
        basicSetup(),
        langs.html(),
        peerExtension(socket, state.version ?? 0, cursorId, roomId),
        cursorExtension(cursorText),
      ],
    });

    let view: any;

    setTimeout(() => {
      view = new EditorView({ state: startState, parent: editor.current });
    }, 500);

    return () => {
      view?.destroy();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <div ref={editor}></div>;
};
