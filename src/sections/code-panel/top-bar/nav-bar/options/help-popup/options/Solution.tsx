import { useAtom } from "jotai";
import { CopyBlock, dracula } from "react-code-blocks";

import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";

const Solution = (): React.ReactElement => {
  const [{ solutionCode }] = useAtom(globalCodePanelAtom);
  return (
    <CopyBlock
      text={solutionCode || "NO SOLUTION"}
      language="html"
      theme={dracula}
      wrapLines
      customStyle={{
        height: "150px",
        overflowY: "scroll",
        borderRadius: "0",
        boxShadow: "none",
        fontSize: "0.75rem",
      }}
    />
  );
};

export default Solution;
