import { useRouter } from "next/router";
import React, { useState } from "react";

import { io } from "socket.io-client";

import { RealTimeCodeEditor } from "@components";
import { BaseResponseInterface } from "@utils";
import { useAuthContext } from "src/auth/useAuthContext";
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";
import { mapValidations } from "src/utils/validationMaping";

import BaseBlock from "../BaseBlock";
import Checkers from "./code-checkers";

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
        roomId={query?.studentId as string ?? user?.id}
        connectionType={query?.studentId !== undefined ? "connect" : "create"}
        userId={user?.id as string}
        colabCursonId={user?.email}
        colabCursonText={`${user?.first_name}`}
        onChangeCode={(code) => {
          setCode(code);
          onChangeCode(code);
        }}
      />
    </BaseBlock>
  );
};

export default React.memo(CodeEditorBlock);
