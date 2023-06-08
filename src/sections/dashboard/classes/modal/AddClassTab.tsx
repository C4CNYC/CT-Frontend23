import { RHFTextField, RHFUploadAvatar } from "@components/hook-form";
import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

interface Props {
  handleDrop: (acceptedFiles: File[]) => void;
}
export default function AddClassTab({ handleDrop }: Props): React.ReactElement {
  return (
    <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }}>
      <Box
        sx={{
          mt: { xs: 0, sm: 2 },
          mr: { xs: 0, sm: 3 },
          mb: { xs: 2, sm: 0 },
        }}
      >
        <RHFUploadAvatar
          name="avatar"
          onDrop={handleDrop}
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: "auto",
                display: "block",
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              Live empty and we will generate it randomly
            </Typography>
          }
        />
      </Box>
      <Stack direction="column" sx={{ gap: 3, width: "100%" }}>
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
          <RHFTextField name="description" required multiline rows={3} />
        </Box>
      </Stack>
    </Stack>
  );
}
