import { memo } from "react";

import { Box } from "@mui/system";

const CodeSpace = (): React.ReactElement | null => {
  return <Box flex="1"> content code </Box>;
};

export default memo(CodeSpace);
