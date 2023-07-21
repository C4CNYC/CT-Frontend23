import { useState } from "react";

// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
// @mui
import { LoadingButton } from "@mui/lab";
import { Alert, IconButton, InputAdornment, Stack } from "@mui/material";

// components
import { FormProvider, Iconify, RHFTextField } from "@components";

// auth
import { useAuthContext } from "../../auth/useAuthContext";

// ----------------------------------------------------------------------

interface FormValuesProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
  tenantName: string;
}

interface AuthRegisterFormProps {
  next: () => void;
}

export default function AuthRegisterForm({
  next,
}: AuthRegisterFormProps): React.ReactElement | null {
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    tenantName: Yup.string()
      .required("Organization name required")
      .max(9, "Name must be shorter"),
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
    tenantName: "",
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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (register) {
        await register(
          data.email,
          data.password,
          data.firstName,
          data.lastName,
          data.tenantName
        );
        next();
      }
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

        <RHFTextField name="tenantName" label="Organization name" />

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
          loading={isSubmitting || isSubmitSuccessful}
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
