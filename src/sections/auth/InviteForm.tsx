import {useEffect, useState} from "react";
import * as Yup from "yup";
// next
import NextLink from "next/link";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH } from "../../routes/paths";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// components
import Iconify from "../../components/iconify";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import router from "next/router";
import { PATH_AFTER_LOGIN } from "src/config-global";
import { useDispatch } from "react-redux";
import {useInviteSubmitMutation} from "../../redux/services/admin";
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

type FormValuesProps = {
  password: string;
  inviteId: string;
};

export default function InviteForm() {
  const { login } = useAuthContext();
  const router = useRouter();
  const {id} = router.query;
  const {tenant_name} = router.query;

  useEffect(() => {
    localStorage.setItem("tenantName", tenant_name as string);
  }, [tenant_name]);

  const [submitInvite, { isLoading }] = useInviteSubmitMutation();
  const [showPassword, setShowPassword] = useState(false);

  const inviteId = id as string;

  const InviteSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required'),
    confirmPwd: Yup.string()
      .required('Password is required')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(InviteSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await submitInvite({
        password: data.password,
        inviteId: inviteId,
      }).unwrap();
      router.replace(
        {
          pathname: PATH_AUTH.login,
          query: { tenant_name: tenant_name },
        });
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
          <Alert severity="error">{errors.afterSubmit.data.message}</Alert>
        )}

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
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
          name="confirmPwd"
          label="Password confirmation"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
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

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isLoading}
        sx={{
          mt: 4,
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
        Submit Invite
      </LoadingButton>
    </FormProvider>
  );
}
