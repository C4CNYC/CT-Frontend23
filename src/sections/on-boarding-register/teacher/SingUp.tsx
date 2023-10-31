import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdArrowBackIosNew } from "react-icons/md";

import { LoadingButton } from "@mui/lab";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { RHFTextField, useSnackbar } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";

interface Props {
  isValid?: boolean;
  isTeacher: boolean;
  nextStep: () => void;
  prevStep?: () => void;
  goToStep: (s: number) => void;
}

export default function SingUp({
  nextStep,
  prevStep,
  isValid,
  isTeacher,
  goToStep,
}: Props): React.ReactElement {
  const { registerWithGoogle } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterWithGoogle = useGoogleLogin({
    onSuccess: async ({ access_token: token }) => {
      setIsLoading(true);
      try {
        await registerWithGoogle(token);
        if (isTeacher) {
          goToStep(3);
        } else {
          goToStep(2);
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
      setIsLoading(false);
    },
  });

  return (
    <>
      {isTeacher && (
        <IconButton onClick={prevStep} sx={{ ml: "-30px", mt: "-30px" }}>
          <MdArrowBackIosNew />
        </IconButton>
      )}
      <Stack
        direction="row"
        sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: isTeacher ? "50px" : "70px" }}
      >
        <Typography variant="h3">Sign up</Typography>
        <Typography variant="h3" sx={{ ml: 1 }}>
          😃
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
        This is my first time here
      </Typography>
      <Stack sx={{ mt: 1 }}>
        <RHFTextField
          name="email"
          label="Email"
          defaultValue=""
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
                    if (!isValid) return;
                    nextStep();
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
            onRegisterWithGoogle();
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
          Sign up with Google
        </LoadingButton>
      </Stack>
    </>
  );
}
