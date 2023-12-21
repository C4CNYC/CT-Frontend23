import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { Iconify, RHFTextField } from "@components";

import { styledRegisterInput } from "../styles";

interface Props {
  isSubmiting: boolean;
  isSubmitSuccessful: boolean;
  nextStep: () => void;
}

export default function AddTeacher({
  isSubmiting,
  isSubmitSuccessful,
  nextStep,
}: Props): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      nextStep();
    }
  }, [isSubmitSuccessful]);

  return (
    <Stack minHeight={450}>
      <Stack direction="row" sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: 3 }}>
        <Typography variant="h3">Register as Teacher</Typography>
      </Stack>
      <Typography variant="body1" sx={{ ml: { xs: 3, sm: 3, md: 0 }, mb: 4 }}>
        Get ready for awesome
      </Typography>
      <Stack gap={2}>
        <RHFTextField
          name="firstName"
          label="First Name"
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
        <RHFTextField
          name="lastName"
          label="Surname"
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
        <Divider sx={{ my: 1 }} />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge="end"
                  sx={{ color: "#02D3D7" }}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        type="submit"
        loading={isSubmiting}
        sx={{
          background: "#43D4DD33",
          color: "#43D4DD",
          fontSize: "1.5rem",
          mt: 2,
          width: "100%",
          "&:hover": {
            background: "#fff",
          },
        }}
      >
        WHOOPIE
      </LoadingButton>
    </Stack>
  );
}
