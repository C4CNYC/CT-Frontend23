/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable no-new */
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { langs } from "@uiw/codemirror-extensions-langs";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { indentUnit } from "@codemirror/language"
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { mapValidations } from "src/utils/validationMaping";
import BaseBlock from "../BaseBlock";
import Checkers from "./Checkers";

import { getDocument, peerExtension } from "./extentions/collab";
import { useAuthContext } from "src/auth/useAuthContext";
import { useRouter } from "next/router";

import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";

const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", { path: "/" });

export const Editor = ({ state, user }: any) => {
  const editor = useRef();

  useEffect(() => {
    setTimeout(() => {}, 500)
    const startState = EditorState.create({
      doc: state.doc,
      extensions: [keymap.of(defaultKeymap), indentUnit.of("\t"),
        basicSetup(),
        langs.html(),
        // cursorExtension(user?.email),
        peerExtension(socket, state.version ?? 0, user?.email)],
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

interface ICodeEditorBlock {
  columns?: 1 | 2;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
  // preloadedCode: string;
}

interface State {
  connected: boolean,
  version?: number,
  doc?: string
}

const CodeEditorBlock = ({
  columns = 1,
  validations,
  // preloadedCode,
}: ICodeEditorBlock): React.ReactElement | null => {
  const { user } = useAuthContext();
  const { query } = useRouter();
  const [state, setState] = useState<State>({
    connected: false,
    version: undefined,
    doc: undefined
  })

  useEffect(() => {
    socket.open();
    socket.emit("joinRoom", query.studentId);
    getDocument(socket).then(({ version, doc }) => {
       setState((prev) => ({
        ...prev,
        version,
        connected: true,
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        doc: doc?.toString(),
      }));
    });
    socket.on("connection", () => {
      setState((prev) => ({
        ...prev,
        connected: true,
      }));
    });

    socket.on("disconnect", () => {
      setState((prev) => ({
        ...prev,
        connected: false,
      }));
    });

    window.addEventListener("beforeunload", () => {
      socket.emit("leaveRoom", query?.studentId);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pullUpdateResponse");
      socket.off("pushUpdateResponse");
      socket.off("getDocumentResponse");
      socket.close();
    });

    return () => {
      setState((prev) => ({
        ...prev,
        version: undefined,
        doc: undefined,
      }));
      socket.emit("leaveRoom", query.studentId);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pullUpdateResponse");
      socket.off("pushUpdateResponse");
      socket.off("getDocumentResponse");
      socket.close();
      socket.disconnect();
    };
  }, []);

  if (
    state?.version === undefined ||
    state?.doc === undefined ||
    !state.connected
  ) {
    return null
  }

  return (
    <BaseBlock columns={columns}>
      <style>
        {`
          .cm-editor {
            height: 100vh;
          }
        `}
      </style>
      {validations?.length ? (
        <Checkers checkers={mapValidations(state.doc ?? "", validations)} />
      ) : null}
      <Editor state={state} user={user}/>
    </BaseBlock>
  );
};

export default React.memo(CodeEditorBlock);
