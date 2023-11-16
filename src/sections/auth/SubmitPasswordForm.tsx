import { useRouter } from "next/router";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";

import { Iconify } from "@components";
import { useSubmitPasswordMutation } from "src/redux/services/auth";

import { FormProvider, RHFTextField } from "../../components/hook-form";
import { useSnackbar } from "../../components/snackbar";
import { PATH_AUTH } from "../../routes/paths";

interface FormValuesProps {
  password: string;
  confirmPassword: string;
}

export default function SubmitPasswordForm() {
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [submitPassword, { isLoading }] = useSubmitPasswordMutation();

  const VerifyCodeSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      submitPassword({
        id: query.id as string,
        password: data.password,
      }).unwrap();
      enqueueSnackbar("Change password success!");
      push(PATH_AUTH.signIn);
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: "error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
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
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{
            mt: 3,
            borderRadius: "100px",
            background: "#02D3D7",
            "&:hover": {
              background: "#fff",
              boxShadow: "0px 8px 16px rgba(2, 211, 215, 0.24)",
              color: "#02D3D7",
              border: "1px solid #02D3D7",
            },
          }}
        >
          Update Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
