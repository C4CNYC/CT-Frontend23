import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect } from "react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import BaseBlock from "../BaseBlock";
import Checkers from "./Checkers";
import { mapValidations } from "src/utils/validationMaping";
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";
import { useWorkSpaceManager } from "@sections/teacher-panel/code-panel/hooks/useWorkSpaceManager.hook";

interface ICodeEditorBlock {
  columns?: 1 | 2;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
  preloadedCode: string
}

export const CodeEditorBlock = ({ columns = 1, validations, preloadedCode }: ICodeEditorBlock): React.ReactElement => {
  const { code, onChangeCode } = useWorkSpaceManager();

  useEffect(() => {
    if (code.code || !preloadedCode) return;
    onChangeCode(preloadedCode);
  }, [preloadedCode])

  return (
    <BaseBlock columns={columns}>
      {validations?.length ? <Checkers checkers={mapValidations(code.code, validations)}/> : null}
      <CodeMirror
        value={code.code}
        theme={dracula}
        height="calc(100vh - 48px)"
        lang={code.language}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        extensions={[loadLanguage("html")]}
        onChange={(value) => {
          onChangeCode(value);
        }}
      />
    </BaseBlock>
  );
};
