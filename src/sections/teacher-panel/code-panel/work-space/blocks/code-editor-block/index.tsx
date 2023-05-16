import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { mapValidations } from "src/utils/validationMaping";
import BaseBlock from "../BaseBlock";
import Checkers from "./checkers";

import { getDocument, peerExtension } from "./extentions/collab";
import { useAuthContext } from "src/auth/useAuthContext";
import { useRouter } from "next/router";

import { Editor } from "./editor";

const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", { path: "/" });

interface ICodeEditorBlock {
  columns?: 1 | 2;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
  onChangeCode: (code: string) => void
  // preloadedCode: string;
}

export interface State {
  connected: boolean,
  version?: number,
  doc?: string
}

const CodeEditorBlock = ({
  columns = 1,
  validations,
  onChangeCode,
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
      <Editor
        onChangeCode={onChangeCode}
        state={state}
        user={user}
        socket={socket}
      />
    </BaseBlock>
  );
};

export default React.memo(CodeEditorBlock);
