import { useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Alert, IconButton, InputAdornment, Stack } from "@mui/material";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// components
import { FormProvider, Iconify, RHFTextField } from "@components";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { PATH_AUTH } from "@routes/paths";
import { useRouter } from "next/router";
// ----------------------------------------------------------------------

interface FormValuesProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
  tenantName: string;
}

export default function AuthOrganizationForm(): React.ReactElement | null {
  const { registerToOrganization } = useAuthContext();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Password must include at least one uppercase letter, one lowercase letter, and one numeric digit"
      )
      .min(10, "Password must be at least 10 characters long"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (registerToOrganization) {
        await registerToOrganization(
          data.email,
          data.password,
          data.firstName,
          data.lastName
        );
      }
      router.push(PATH_AUTH.login);
    } catch (error: any) {
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} sx={{ mt: 5 }}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

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

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            boxShadow: "0px 8px 16px rgba(2, 211, 215, 0.24)",
            bgcolor: "#FBDD3F",
            borderRadius: "50px",
            fontSize: "22px",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          <RocketLaunchIcon sx={{ mr: "5px" }} />
          Let’s GO!
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
