import * as React from "react";

import { MuiColorInput } from "mui-color-input";
import { Control, Controller } from "react-hook-form";

import { Box, Stack, Typography } from "@mui/material";

import { RHFTextField, RHFUploadAvatar } from "@components";

import { FormAddClassProps } from ".";

interface Props {
  handleDrop: (acceptedFiles: File[]) => void;
  control: Control<FormAddClassProps, any>;
}
export default function AddClassTab({
  handleDrop,
  control,
}: Props): React.ReactElement {
  return (
    <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }}>
      <Box
        sx={{
          mr: { xs: 0, sm: 3 },
          mb: { xs: 2, sm: 0 },
        }}
      >
        <RHFUploadAvatar name="avatar" onDrop={handleDrop} />
        <Box>
          <Typography variant="h6" sx={{ mb: 1, ml: 1, mt: 2.3 }}>
            Cover:
          </Typography>
          <Controller
            control={control}
            name="cover"
            render={({ field, fieldState }) => (
              <MuiColorInput
                sx={{ width: "100%" }}
                {...field}
                value={field.value}
                helperText={fieldState.invalid ? "Color is invalid" : ""}
                error={fieldState.invalid}
                isAlphaHidden
                format="hex"
              />
            )}
          />
        </Box>
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
