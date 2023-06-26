import {
  RHFTextField,
  FormProvider,
  Iconify,
} from "@ct-nx/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from "@mui/material";
import { PATH_AUTH } from "@routes/paths";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcCheckmark } from "react-icons/fc";
import { useSubmitPasswordMutation } from "src/redux/services/auth";
import * as Yup from "yup";

// ----------------------------------------------------------------------

interface FormValuesProps {
  password: string;
  confirmPassword: string;
}

export default function SubmitPasswordForm(): React.ReactElement {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  const [submitPassword, { isLoading }] = useSubmitPasswordMutation();

  const InviteSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(InviteSchema),
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await submitPassword({
        id: id as string,
        password: data.password,
      }).unwrap();
      setIsSuccess(true);
      router.push(PATH_AUTH.login);
    } catch (error: any) {
      methods.reset();
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      {!isSuccess ? (
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
      ) : (
        <Box
          sx={{
            minHeight: "136px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FcCheckmark size="80px" />
        </Box>
      )}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          whiteSpace: "nowrap",
          mt: 5,
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
          [theme.breakpoints.down(400)]: {
            fontSize: "1rem",
          },
        }}
      >
        Save new password
      </LoadingButton>
    </FormProvider>
  );
}
