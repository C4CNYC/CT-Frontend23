import { memo } from "react";

import { Box } from "@mui/system";

const ViewSpace = (): React.ReactElement | null => {
  return <Box flex="1"> content view </Box>;
};

export default memo(ViewSpace);
