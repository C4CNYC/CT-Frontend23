// components
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// next
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// @mui
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";

import { FormProvider, Iconify, RHFTextField, useSnackbar } from "@components";
import { useInviteSubmitMutation } from "src/redux/services/admin/invite-admin";

// routes
import { PATH_AUTH } from "../../routes/paths";

// ----------------------------------------------------------------------

interface FormValuesProps {
  password: string;
  inviteId: string;
}

export default function InviteForm(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
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
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Password must include at least one uppercase letter, one lowercase letter, and one numeric digit"
      )
      .min(10, "Password must be at least 10 characters long"),
    confirmPwd: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(InviteSchema),
    mode: "all",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await submitInvite({
        password: data.password,
        inviteId,
      }).unwrap();
      enqueueSnackbar("Submit successfully");
      router.replace({
        pathname: PATH_AUTH.signIn,
        query: { tenant_name },
      });
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
        loading={isLoading}
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
