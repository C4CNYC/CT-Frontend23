/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable no-new */
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { indentUnit } from "@codemirror/language"
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { mapValidations } from "src/utils/validationMaping";
import BaseBlock from "../BaseBlock";
import Checkers from "./Checkers";

import { cursorExtension } from "./extentions/cursors";
import { getDocument, peerExtension } from "./extentions/collab";
import { useAuthContext } from "src/auth/useAuthContext";

const socket = io("http://localhost:9000", { path: "/api" });

interface ICodeEditorBlock {
  columns?: 1 | 2;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
  preloadedCode: string;
}

interface State {
  connected: boolean,
  version?: number,
  doc?: string
}

const CodeEditorBlock = ({
  columns = 1,
  validations,
  preloadedCode,
}: ICodeEditorBlock): React.ReactElement => {
  const { user } = useAuthContext();
  const [state, setState] = useState<State>({
    connected: false,
    version: undefined,
    doc: undefined
  })

  useEffect(() => {
    console.log("[CODE_PANEL]: RENDERED")
    getDocument(socket).then(({ version, doc }) => {
      console.log("[CODE_PANEL]: GET DOCUMENT", { version, doc })
      setState((prev) => ({
        ...prev,
        version,
        doc: doc.toString()
      }));
    });

    socket.on("connect", () => {
      console.log("[CODE_PANEL]: CONNECTED TO CHANEL")
    });

    socket.on("disconnect", () => {
      console.log("[CODE_PANEL]: DISCONNECTED FROM CHANEL")
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pullUpdateResponse");
      socket.off("pushUpdateResponse");
      socket.off("getDocumentResponse");
    }
  }, [])

  return (
    <BaseBlock columns={columns}>
      <style>
        {`
          #codeEditor {
            height: 100%
          }
        `}
      </style>
      {validations?.length ? (
        <Checkers checkers={mapValidations(state.doc ?? "", validations)} />
      ) : null}
      {
         state?.version !== undefined && state?.doc !== undefined ? (
            <CodeMirror
            className="flex-1 overflow-scroll"
            height="100%"
            basicSetup={false}
            id="codeEditor"
            extensions={[
              indentUnit.of("\t"),
              basicSetup(),
              langs.c(),
              peerExtension(socket, state.version, user?.email),
              cursorExtension(user?.email)
            ]}
            value={state.doc}
          />
        ) : null
      }
    </BaseBlock>
  );
};

export default CodeEditorBlock;
