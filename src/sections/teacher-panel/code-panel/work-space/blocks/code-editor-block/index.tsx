import { io } from "socket.io-client";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { BaseResponseInterface } from "@utils";
import { RealTimeCodeEditor } from "@components";

import BaseBlock from "../BaseBlock";
import Checkers from "./code-checkers";
import { useAuthContext } from "src/auth/useAuthContext";
import { mapValidations } from "src/utils/validationMaping";
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";


const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", { path: "/" });

interface ICodeEditorBlock {
  columns?: 1 | 2;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
  onChangeCode: (code: string) => void;
  // preloadedCode: string;
}

export interface State {
  connected: boolean;
  version?: number;
  doc?: string;
}

const CodeEditorBlock = ({
  columns = 1,
  validations,
  onChangeCode,
}: // preloadedCode,
ICodeEditorBlock): React.ReactElement | null => {
  const { user } = useAuthContext();
  const { query } = useRouter();
  const [code, setCode] = useState<string>("");

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
        <Checkers checkers={mapValidations(code, validations)} />
      ) : null}
      <RealTimeCodeEditor
        socket={socket}
        roomId={query.studentId as string}
        colabCursonId={user?.email}
        colabCursonText={`${user?.first_name} ${user?.last_name?.[0]}`}
        onChangeCode={(code) => {
          setCode(code);
          onChangeCode(code);
        }}
      />
    </BaseBlock>
  );
};

export default React.memo(CodeEditorBlock);
