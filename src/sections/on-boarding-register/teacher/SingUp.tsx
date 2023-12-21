import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdArrowBackIosNew } from "react-icons/md";

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
import { Role } from "src/redux/services/enums/role.enum";
import { useTranslate } from "src/utils/translateHelper";

import { styledRegisterInput } from "../styles";

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
  const translate = useTranslate();

  const onRegisterWithGoogle = useGoogleLogin({
    onSuccess: async ({ access_token: token }) => {
      setIsLoading(true);
      try {
        const role = isTeacher ? Role.Manager : Role.Student;
        await registerWithGoogle(token, role);
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
      <Stack direction="row" sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: "40px" }}>
        <Typography variant="h3">{translate("login_sign_up")}</Typography>
        <Typography variant="h3" sx={{ ml: 1 }}>
          😃
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
        {translate("login_my_first_time")}
      </Typography>
      <Stack sx={{ mt: 1 }}>
        <RHFTextField
          name="email"
          label={translate("email")}
          defaultValue=""
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
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
            {translate("login_or")}
          </Typography>
        </Divider>
        <LoadingButton
          onClick={() => {
            onRegisterWithGoogle();
          }}
          loading={isLoading}
          sx={(theme) => ({
            color:
              theme.palette.mode === "light"
                ? theme.palette.grey[600]
                : theme.palette.text.primary,
            textTransform: "none",
            py: 1.5,
            mb: 1,
            gap: 2,
            background:
              theme.palette.mode === "light" ? theme.palette.grey[200] : "",
            fontWeight: 400,
            fontSize: "1.3em",
            "&:hover": {
              color: theme.palette.grey[900],
              background: theme.palette.mode === "light" ? "" : "#fff",
            },
          })}
        >
          <FcGoogle size="50px" />
          {translate("login_sign_up_with_google")}
        </LoadingButton>
      </Stack>
    </>
  );
}
