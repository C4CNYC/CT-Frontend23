import { ICodeContent } from "@sections/teacher-panel/code-panel/atoms/code.atom";
import BaseBlock from "../BaseBlock";
import { CodeResultView } from "@components/code-result-view";

const ViewBlock = ({ code, language }: ICodeContent): React.ReactElement => {
  return (
    <BaseBlock>
      <CodeResultView code={code} language={language} />
    </BaseBlock>
  );
};

export default ViewBlock;
