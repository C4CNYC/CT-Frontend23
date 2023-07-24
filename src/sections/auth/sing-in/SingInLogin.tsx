import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { StepWizardChildProps } from "react-step-wizard";

import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { RHFTextField } from "@components";
import { STUDENT_PATH_AFTER_LOGIN } from "src/config-global";
import { useAuthContext } from "src/auth/useAuthContext";

export default function SingInLogin({
  nextStep,
  isValid,
}: Partial<StepWizardChildProps> & { isValid: boolean }): React.ReactElement {
  const router = useRouter();
  const { loginWithGoogle } = useAuthContext();

  const onLoginWithGoogle = useGoogleLogin({
    onSuccess: ({ access_token: token }) => {
      loginWithGoogle(token)
      router.push(
        STUDENT_PATH_AFTER_LOGIN
      );
    },
  });

  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "center", ml: { xs: 3, sm: 3, md: 0 } }}
      >
        <Typography variant="h3">Sing in</Typography>
        <Typography variant="h2" sx={{ ml: 1 }}>
          🫶
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
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
                    isValid ? nextStep?.() : null;
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
        <Button
          onClick={() => { onLoginWithGoogle() }}
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
          Sing up with Google
        </Button>
      </Stack>
    </>
  );
}
