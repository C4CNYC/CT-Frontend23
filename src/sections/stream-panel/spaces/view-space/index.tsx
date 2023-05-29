import { Box } from "@mui/system";
import { memo } from "react";

const ViewSpace = (): React.ReactElement | null => {
  return <Box flex="1"> content view </Box>;
}

export default memo(ViewSpace);
