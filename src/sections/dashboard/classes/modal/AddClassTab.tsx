import { RHFTextField } from "@components/hook-form";
import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

export default function AddClassTab(): React.ReactElement {
  return (
    <>
      <Stack direction="column" sx={{ gap: 3, px: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 1, ml: 1 }}>
            Name:
          </Typography>
          <RHFTextField name="name" required />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 1, ml: 1 }}>
            Description:
          </Typography>
          <RHFTextField name="description" required multiline rows={5} />
        </Box>
      </Stack>
    </>
  );
}
