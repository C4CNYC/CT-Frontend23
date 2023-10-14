import { useRouter } from "next/router";
import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { StepWizardChildProps } from "react-step-wizard";

import { LoadingButton } from "@mui/lab";
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { RHFTextField, useSnackbar } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";
import { STUDENT_PATH_AFTER_LOGIN } from "src/config-global";

export default function SingInLogin({
  nextStep,
  isValid,
}: Partial<StepWizardChildProps> & { isValid?: boolean }): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { loginWithGoogle } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const onLoginWithGoogle = useGoogleLogin({
    onSuccess: async ({ access_token: token }) => {
      setIsLoading(true);
      try {
        await loginWithGoogle(token);
        router.push(STUDENT_PATH_AFTER_LOGIN);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
      setIsLoading(false);
    },
  });

  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "center", ml: { xs: 3, sm: 3, md: 0 } }}
      >
        <Typography variant="h3">Sign in</Typography>
        <Typography variant="h2" sx={{ ml: 1 }}>
          🫶
        </Typography>
      </Stack>
      <Typography
        variant="body1"
        sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 }, mb: 2 }}
      >
        Welcome back
      </Typography>
      <Stack sx={{ mt: 1 }}>
        <RHFTextField
          name="email"
          label="Email"
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
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => {
                    if (nextStep && isValid) {
                      nextStep();
                    }
                  }}
                >
                  <FaArrowRight color={isValid ? "#43D4DD" : ""} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Divider sx={{ my: 3 }} flexItem>
          <Typography
            sx={(theme) => ({ color: theme.palette.grey[500], mx: 1 })}
            variant="body1"
          >
            OR
          </Typography>
        </Divider>
        <LoadingButton
          onClick={() => {
            onLoginWithGoogle();
          }}
          loading={isLoading}
          sx={(theme) => ({
            color: theme.palette.grey[600],
            textTransform: "none",
            py: 1.5,
            mb: 1,
            gap: 2,
            background: theme.palette.grey[200],
            fontWeight: 400,
            fontSize: "1.3em",
            "&:hover": {
              color: theme.palette.grey[900],
            },
          })}
        >
          <FcGoogle size="50px" />
          Sign in with Google
        </LoadingButton>
      </Stack>
    </>
  );
}
