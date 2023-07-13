import { useRouter } from "next/router";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { IoRocketSharp } from "react-icons/io5";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

import { FormProvider, Iconify, RHFTextField } from "@components";
import {
  MANAGER_PATH_AFTER_LOGIN,
  STUDENT_PATH_AFTER_LOGIN,
} from "src/config-global";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import { useRegisterMutation } from "src/redux/services/auth";
import { Role } from "src/redux/services/enums/role.enum";
import { useCreateClassMutation } from "src/redux/services/student/classes-manager";

import JoinCode from "./JoinCode";

// ----------------------------------------------------------------------

interface FormValuesProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tenantName: string;
}

interface Props {
  isStudent: boolean;
}

export default function RegisterForm({ isStudent }: Props): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [createClass, { isLoading: isCreateClassLoading }] =
    useCreateClassMutation();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter your name"),
    lastName: Yup.string().required("Enter your surname"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      const profile = await register({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        role: isStudent ? Role.Student : Role.Manager,
      }).unwrap();
      localStorage.setItem("accessToken", profile.access_token);
      await createClass({ name: "Happy Tribe" }).unwrap();
      router.reload();
      router.replace(
        isStudent ? STUDENT_PATH_AFTER_LOGIN : MANAGER_PATH_AFTER_LOGIN
      );
    } catch (e) {
      const typedError = e as APIError;
      enqueueSnackbar(typedError.data.message, { variant: "error" });
    }
  };
  return (
    <>
      {isStudent && (
        <TextField
          id="join code"
          label="Do you have a join code?"
          variant="filled"
          fullWidth
          disabled
          sx={{ mb: !isStudent ? 2 : 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <JoinCode>
                  <Button sx={{ color: "#02D3D7" }}>Apply Join Code</Button>
                </JoinCode>
              </InputAdornment>
            ),
          }}
        />
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ mt: !isStudent ? 1 : 0, gap: 2 }}>
          <Stack sx={{ flexDirection: { sm: "row" }, gap: 2 }}>
            <RHFTextField name="firstName" label="First name" />
            <RHFTextField name="lastName" label="Last name" />
          </Stack>
          <RHFTextField
            sx={{
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#02D3D7",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#02D3D7",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid",
                  borderColor: "#02D3D7",
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
              "& .MuiInputBase-root": { height: "52px" },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#02D3D7",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#02D3D7",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid",
                  borderColor: "#02D3D7",
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
                    sx={{ color: "#02D3D7" }}
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
          loading={isSubmitting || isLoading || isCreateClassLoading}
          sx={{
            boxShadow: "0px 8px 16px rgba(2, 211, 215, 0.24)",
            bgcolor: "#02D3D7",
            borderRadius: "100px",
            fontSize: "15px",
            mt: 3,
            "&:hover": {
              background: "#02D3D714",
              border: "1px solid #02D3D7",
              color: "#02D3D7",
              boxShadow: "none",
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
