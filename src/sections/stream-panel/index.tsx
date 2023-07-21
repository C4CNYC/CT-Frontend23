import { memo } from "react";

import { Box, Stack } from "@mui/system";

import { ResizerUi } from "@components";

import CodeSpace from "./spaces/code-space";
import ContentSpace from "./spaces/content-space";
import ViewSpace from "./spaces/view-space";

const StreamPanel = (): React.ReactElement | null => {
  return (
    <Box>
      <ResizerUi split="vertical" maxSize={550} minSize={350} defaultSize={450}>
        <ContentSpace />
        <Stack direction="row">
          <CodeSpace />
          <ViewSpace />
        </Stack>
      </ResizerUi>
    </Box>
  );
};

export default memo(StreamPanel);
