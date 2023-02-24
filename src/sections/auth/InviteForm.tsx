import { useEffect, useState } from "react";
import * as Yup from "yup";
// next
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
// components
import { useRouter } from "next/router";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import Iconify from "../../components/iconify";
import { useInviteSubmitMutation } from "../../redux/services/admin";

// ----------------------------------------------------------------------

interface FormValuesProps {
  password: string;
  inviteId: string;
}

export default function InviteForm(): React.ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const { tenant_name } = router.query;

  useEffect(() => {
    localStorage.setItem("tenantName", tenant_name as string);
  }, [tenant_name]);

  const [submitInvite, { isLoading }] = useInviteSubmitMutation();
  const [showPassword, setShowPassword] = useState(false);

  const inviteId = id as string;

  const InviteSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPwd: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(InviteSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await submitInvite({
        password: data.password,
        inviteId,
      }).unwrap();
      router.replace({
        pathname: PATH_AUTH.login,
        query: { tenant_name },
      });
    } catch (error) {
      console.error(error);
      reset();
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
          name="confirmPwd"
          label="Password confirmation"
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
