import { useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, InputAdornment, Stack } from "@mui/material";
// components
import {
  RHFTextField,
  FormProvider,
  Iconify,
} from "@ct-nx/components";
import { IoRocketSharp } from "react-icons/io5";
import { voidFunction } from "@ct-nx/utils";

// ----------------------------------------------------------------------

interface FormValuesProps {
  email: string;
  password: string;
}

export default function RegisterTeacherForm(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    teacherName: Yup.string().required("Teacher name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address")
      .trim(),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {voidFunction()};

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <RHFTextField
            sx={{
              mb: "24px",
              "& .MuiInputBase-root": { height: "52px" },
              "& .MuiFormLabel-root.Mui-focused": {
                color: (theme) => theme.palette.primary.main,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#02D3D7",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid",
                  borderColor: (theme) => theme.palette.primary.main,
                },
              },
            }}
            name="teacherName"
            label="Your Name"
          />
          <RHFTextField
            sx={{
              mb: "24px",
              "& .MuiInputBase-root": { height: "52px" },
              "& .MuiFormLabel-root.Mui-focused": {
                color: (theme) => theme.palette.primary.main,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#02D3D7",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid",
                  borderColor: (theme) => theme.palette.primary.main,
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
              mb: "24px",
              "& .MuiInputBase-root": { height: "52px" },
              "& .MuiFormLabel-root.Mui-focused": {
                color: (theme) => theme.palette.primary.main,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#02D3D7",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid",
                  borderColor: (theme) => theme.palette.primary.main,
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
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitSuccessful || isSubmitting}
          sx={{
            boxShadow: "0px 8px 16px rgba(2, 211, 215, 0.24)",
            bgcolor: "primary",
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
          Whoop whoop, register now!
        </LoadingButton>
      </FormProvider>
    </>
  );
}
