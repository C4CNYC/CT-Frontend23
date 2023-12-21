import { type FC } from "react";

import { CopyBlock, dracula } from "react-code-blocks";

import { useSelector } from "src/redux/store";

const Solution: FC = () => {
  const solutionCode = useSelector(
    (state) => state.codePanelGlobal.solutionCode
  );

  return (
    <CopyBlock
      text={solutionCode || NO_SOLUTION_TEXT}
      language="html"
      theme={dracula}
      wrapLines
      customStyle={COPY_BLOCK_STYLES}
    />
  );
};

const NO_SOLUTION_TEXT = "NO SOLUTION";

const COPY_BLOCK_STYLES = {
  height: "150px",
  overflowY: "scroll",
  borderRadius: "0",
  boxShadow: "none",
  fontSize: "0.75rem",
};

export default Solution;
