import { useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { FormProvider, Iconify, RHFTextField } from "@components";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PATH_AUTH, PATH_DASHBOARD } from "@routes/paths";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { IoRocketSharp } from "react-icons/io5";
import { useAuthContext } from "src/auth/useAuthContext";
import { PATH_AFTER_LOGIN } from "src/config-global";
import { useRegisterMutation } from "src/redux/services/auth";
import { useRegisterManagerProfileMutation } from "src/redux/services/student-auth";
import { useCreateClassMutation } from "src/redux/services/student/classes-manager";

// ----------------------------------------------------------------------

interface FormValuesProps {
  email: string;
  password: string;
  tenantName: string;
  afterSubmit?: string;
}

interface Props {
  isStudent: boolean;
  isLogin: boolean;
}

export default function RegisterCoderForm({
  isStudent,
  isLogin,
}: Props): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [createClass, { isLoading: isCreateClassLoading }] =
    useCreateClassMutation();
  const [registerManagerProfile, { isLoading: isManagerLoading }] =
    useRegisterManagerProfileMutation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    if (isLogin) {
      try {
        await login(data.email, data.password, "codetribe");
        router.replace(PATH_AFTER_LOGIN);
      } catch (error: any) {
        reset();
        setError("afterSubmit", {
          ...error,
          message: error.message,
        });
      }
    } else {
      try {
        const { user } = await registerManagerProfile({
          ...data,
          first_name: "Happy",
          last_name: "Cat",
        }).unwrap();
        const studentProfile = await register({
          ...data,
          first_name: "Happy",
          last_name: "Cat",
          manager_id: user.id,
        }).unwrap();
        localStorage.setItem("accessToken", studentProfile.access_token);
        await createClass({ name: "Happy Tribe" }).unwrap();
        router.reload();
        router.replace(PATH_DASHBOARD.home);
      } catch (e: any) {
        enqueueSnackbar("something went wrong", { variant: "error" });
        enqueueSnackbar(
          "if you have manager account, you must create student there",
          { variant: "error" }
        );
      }
    }
  };
  return (
    <>
      {isStudent && !isLogin && (
        <TextField
          id="join code"
          label="Do you have a join code?"
          variant="filled"
          fullWidth
          disabled
          sx={{ "& .MuiInputBase-root": { height: "52px" }, mb: "24px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button sx={{ color: "#02D3D7" }}>Apply Join Code</Button>
              </InputAdornment>
            ),
          }}
        />
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <RHFTextField
            sx={{
              mb: "24px",
              "& .MuiInputBase-root": { height: "52px" },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#02D3D7",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#02D3D7",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid",
                  borderColor: "#02D3D7",
                },
              },
            }}
            name="email"
            label="Email address"
          />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            sx={{
              "& .MuiInputBase-root": { height: "52px" },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#02D3D7",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#02D3D7",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid",
                  borderColor: "#02D3D7",
                },
              },
            }}
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

        <Stack direction="row" sx={{ ml: 1, mt: 1, mb: 1, height: "18px" }}>
          {isLogin && (
            <Typography
              sx={{ alignSelf: "left", mt: "-5px" }}
              variant="caption"
            >
              Forgot password?{" "}
              <Link
                component={NextLink}
                href={PATH_AUTH.resetPassword}
                sx={{ ml: 1, color: "#02D3D7" }}
              >
                Reset password
              </Link>
            </Typography>
          )}
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={
            isSubmitting ||
            isLoading ||
            isManagerLoading ||
            isCreateClassLoading
          }
          sx={{
            boxShadow: "0px 8px 16px rgba(2, 211, 215, 0.24)",
            bgcolor: "#02D3D7",
            borderRadius: "100px",
            fontSize: "15px",
            "&:hover": {
              background: "#02D3D714",
              border: "1px solid #02D3D7",
              color: "#02D3D7",
            },
          }}
        >
          <Box sx={{ mr: 1, height: "20px" }}>
            <IoRocketSharp size="20px" />
          </Box>
          {isLogin ? "Login" : "Whoop whoop, register now!"}
        </LoadingButton>
      </FormProvider>
    </>
  );
}
