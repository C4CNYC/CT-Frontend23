import Image from "next/image";

import { Box, Typography } from "@mui/material";

export const NoSelectedStep = (): React.ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">PLS SELECT STEP</Typography>
      <Box pl="50px">
        <Image
          src="/assets/illustrations/illustration_docs.svg"
          alt="docs"
          width="400"
          height="400"
        />
      </Box>
    </Box>
  );
};
