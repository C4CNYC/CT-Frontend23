import { useState } from "react";
import * as Yup from "yup";
// next
import NextLink from "next/link";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Alert, IconButton, InputAdornment, Link, Stack } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// components
import { useRouter } from "next/router";
import { PATH_AFTER_LOGIN } from "src/config-global";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

interface FormValuesProps {
  tenantName: string;
  email: string;
  password: string;
  afterSubmit?: string;
}

export default function AuthLoginForm(): React.ReactElement {
  const { login } = useAuthContext();
  const router = useRouter();
  // const { tenant_name } = router.query;

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    tenantName: Yup.string().required("Tenant name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues: { tenantName: "codetribe" },
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await login(data.email, data.password, data.tenantName);
      router.replace(PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge="end"
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

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={NextLink}
          href={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          {/* Forgot password? */}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          boxShadow: "0px 8px 16px rgba(2, 211, 215, 0.24)",
          bgcolor: "#FBDD3F",
          borderRadius: "50px",
          fontSize: "22px",
          textTransform: "uppercase",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
