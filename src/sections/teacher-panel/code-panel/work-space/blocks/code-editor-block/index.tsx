import { useRouter } from "next/router";
import React, { useState } from "react";

import { BaseResponseInterface } from "@utils";
import { useAuthContext } from "src/auth/useAuthContext";
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";
import { mapValidations } from "src/utils/validationMaping";

import CodeEditorCollab from "../../../../../../components/code-editor-collab";
import { EditorMode } from "../../../../../../components/code-editor-collab/hook/constants";
import { CodeEditor } from "../../../../../../components/real-time-editor/editor";
import BaseBlock from "../BaseBlock";
import Checkers from "./code-checkers";

interface ICodeEditorBlock {
  columns?: 1 | 2;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
  code: string;
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
  code,
  onChangeCode,
}: // preloadedCode,
ICodeEditorBlock): React.ReactElement | null => {
  const { user } = useAuthContext();
  const { query } = useRouter();

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
      {/* <RealTimeCodeEditor
        roomId={query?.studentId as string ?? user?.id}
        connectionType={query?.studentId !== undefined ? "connect" : "create"}
        colabCursonId={user?.email}
        colabCursonText={`${user?.first_name}`}
        onChangeCode={(code) => {
          setCode(code);
          onChangeCode(code);
        }}
      /> */}
      {query?.studentId !== undefined ? (
        <CodeEditorCollab
          preloadedCode={code}
          cursorText={`${user?.first_name} ${user?.last_name?.[0]}.`}
          code={code}
          onChange={onChangeCode}
          userId={user?.id}
          roomId={query?.studentId as string}
          mode={EditorMode.SubOwner}
        />
      ) : (
        <CodeEditor
          code={code}
          onChangeCode={onChangeCode}
          preloadedCode={code}
        />
      )}
    </BaseBlock>
  );
};

export default React.memo(CodeEditorBlock);
