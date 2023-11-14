import { useGoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { LoadingButton } from "@mui/lab";
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { RHFTextField } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";

interface IEmailStepProps {
  nextStep: () => void;
  isValid?: boolean;
}

export default function EmailStep({
  nextStep,
  isValid,
}: IEmailStepProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { registerWithGoogle } = useAuthContext();

  const onRegisterWithGoogle = useGoogleLogin({
    onSuccess: async ({ access_token: token }) => {
      try {
        registerWithGoogle(token);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  return (
    <>
      <Stack
        sx={{ minHeight: "360px", justifyContent: "center", width: "280px" }}
      >
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
        <Divider sx={{ my: 1 }} flexItem>
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
          loading={false}
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
