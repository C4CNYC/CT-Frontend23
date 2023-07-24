import { useState } from "react";

import { StepWizardChildProps } from "react-step-wizard";

import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { Iconify, RHFTextField } from "@components";

export default function SingInPassword({
  previousStep,
  nextStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "center", ml: { xs: 3, sm: 3, md: 0 } }}
      >
        <Typography variant="h3">Sign in with Email</Typography>
        <Typography variant="h2" sx={{ ml: 1 }}>
          ✉️
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
        Welcome back
      </Typography>
      <Stack sx={{ mt: 2 }}>
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          sx={(theme) => ({
            "& .MuiInputBase-root": {
              height: "52px",
              background: theme.palette.grey[200],
            },
            "& fieldset": { border: "none" },
            mb: 4,
          })}
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
        <Button
          type="submit"
          onClick={() => {
            nextStep?.();
          }}
          sx={{
            background: "#43D4DD33",
            color: "#43D4DD",
            fontSize: "1.5rem",
            mt: 1,
            mb: 3,
          }}
        >
          LET'S GO!
        </Button>
        <Button
          onClick={() => {
            previousStep?.();
          }}
          sx={{
            background: "#EE467A33",
            color: "#EE467A",
            fontSize: "1.5rem",
            "&:hover": {
              background: "#f9e0ef",
            },
          }}
        >
          BACK
        </Button>
      </Stack>
    </>
  );
}
