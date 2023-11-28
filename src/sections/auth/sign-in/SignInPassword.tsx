import { useEffect, useState } from "react";

import { MdArrowBackIosNew } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";

import { Iconify, RHFTextField } from "@components";
import { styledRegisterInput } from "@sections/on-boarding-register/styles";

interface Props {
  isSubmiting: boolean;
  isError: string;
}

export default function SingInPassword({
  previousStep,
  nextStep,
  isSubmiting,
  isError,
  currentStep,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDisabledBtn, setIsDisabletBtn] = useState<boolean>(true);

  if (isError) {
    if (nextStep) {
      nextStep();
    }
  }

  useEffect(() => {
    if (currentStep === 2) {
      setIsDisabletBtn(false);
    }
  }, [currentStep]);

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
        sx={{
          alignItems: "center",
          ml: { xs: 3, sm: 3, md: 0 },
          mt: 1,
          mb: 4,
        }}
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
        <LoadingButton
          type="submit"
          disabled={isDisabledBtn}
          loading={isSubmiting}
          sx={(theme) => ({
            background: "#43D4DD33",
            color: "#43D4DD",
            fontSize: "1.5rem",
            mt: 4,
            mb: 2,
            "&:hover": {
              background: theme.palette.mode === "light" ? "" : "#fff",
            },
          })}
        >
          LET'S GO!
        </LoadingButton>
      </Stack>
    </>
  );
}
