import { useState } from "react";

import { MdArrowBackIosNew } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";

import { Iconify, RHFTextField } from "@components";

interface Props {
  isSubmiting: boolean;
  isError: string;
}

export default function SingInPassword({
  previousStep,
  nextStep,
  isSubmiting,
  isError,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (isError) {
    if (nextStep) {
      nextStep();
    }
  }
  return (
    <>
      <IconButton
        onClick={() => {
          if (previousStep) {
            previousStep();
          }
        }}
        sx={{ ml: "-30px", mt: "-30px" }}
      >
        <MdArrowBackIosNew />
      </IconButton>
      <Stack
        direction="row"
        sx={{ alignItems: "center", ml: { xs: 3, sm: 3, md: 0 }, mt: 1, mb: 4 }}
      >
        <Typography variant="h3">Sign in with Email</Typography>
        <Typography variant="h2" sx={{ ml: 1 }}>
          ✉️
        </Typography>
      </Stack>

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
            "& input:-webkit-autofill": {
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "#000",
              transition: "background-color 5000s ease-in-out 0s",
              boxShadow: `inset 0 0 .1px .1px ${theme.palette.grey[200]}`,
            },
            mb: 3,
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
        <LoadingButton
          type="submit"
          loading={isSubmiting}
          sx={{
            background: "#43D4DD33",
            color: "#43D4DD",
            fontSize: "1.5rem",
            mt: 1,
            mb: 2,
          }}
        >
          LET'S GO!
        </LoadingButton>
      </Stack>
    </>
  );
}
