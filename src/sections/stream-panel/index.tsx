import { ResizerUi } from "@components/resizer/Resizer";
import { Box } from "@mui/system";
import { memo } from "react";
import ContentSpace from "./spaces/content-space";
import CodeSpace from "./spaces/code-space";
import { TopBar } from "./top-bar";

const StreamPanel = (): React.ReactElement | null => {
  return <Box>
    <TopBar/>
    <ResizerUi split="vertical" maxSize={550} minSize={350} defaultSize={450}>
      <ContentSpace/>
      <CodeSpace/>
    </ResizerUi>
  </Box>;
}

export default memo(StreamPanel);
