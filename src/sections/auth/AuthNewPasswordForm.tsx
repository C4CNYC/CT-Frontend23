// next
import { useRouter } from "next/router";
import { useState } from "react";

// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// @mui
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";

import { FormProvider, Iconify, RHFTextField, useSnackbar } from "@components";
// components
import { useSubmitPasswordMutation } from "src/redux/services/auth";
import { useTranslate } from "src/utils/translateHelper";

// routes
import { PATH_AUTH } from "../../routes/paths";

// ----------------------------------------------------------------------

interface FormValuesProps {
  password: string;
  confirmPassword: string;
}

export default function AuthNewPasswordForm(): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [updatePassword, { isLoading }] = useSubmitPasswordMutation();
  const translate = useTranslate();

  const VerifyPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, translate("required_password_length_6"))
      .required(translate("required_password"))
      .matches(/[0-9]/, translate("required_password_number"))
      .matches(/[a-z]/, translate("required_password_lowercase"))
      .matches(/[A-Z]/, translate("required_password_uppercase")),
    confirmPassword: Yup.string()
      .required(translate("required_confirm_password"))
      .oneOf([Yup.ref("password"), null], translate("required_password_match")),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(VerifyPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updatePassword({
        id: router.query.id as string,
        password: data.password,
      }).unwrap();
      enqueueSnackbar(translate("messages_change_password"));
      router.push(PATH_AUTH.signIn);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="password"
          label={translate("password")}
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
          label={translate("actions_confirm_password")}
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
        >
          {translate("actions_update_password")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
