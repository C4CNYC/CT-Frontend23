/* eslint-disable @typescript-eslint/ban-tslint-comment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { indentUnit } from "@codemirror/language"
import { EditorView, keymap } from "@codemirror/view";
import { langs } from "@uiw/codemirror-extensions-langs";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";

// import { defaultKeymap } from "@codemirror/commands";
import { peerExtension } from "./extentions/collab";

import { voidFunction } from "@utils";
import { Socket } from "socket.io-client";
import { cursorExtension } from "./extentions/cursors";
import { State } from "../../sections/teacher-panel/code-panel/work-space/blocks/code-editor-block";

interface IEditor {
  state: State,
  cursorId: string,
  cursorText: string,
  onChangeCode: (code: string) => void,
  socket: Socket
}

export const CodeEditor = ({ state, cursorId, cursorText, onChangeCode, socket }: IEditor): React.ReactElement => {
  const editor = useRef();

  useEffect(() => {
    setTimeout(() => { voidFunction() }, 500)
    const startState = EditorState.create({
      doc: state.doc,
      extensions: [
        EditorView.updateListener.of(function(e) {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          onChangeCode(e.state.doc.toString())
        }),
        /* tslint:disable */
        // keymap.of(defaultKeymap),
        indentUnit.of("\t"),
        basicSetup(),
        langs.html(),
        peerExtension(socket, state.version ?? 0, cursorId),
        cursorExtension(cursorText)
      ],
    });

    let view: any;

    setTimeout(() => {
      view = new EditorView({ state: startState, parent: editor.current });
    }, 500)

    return () => {
      view?.destroy();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <div ref={editor}></div>;
};
