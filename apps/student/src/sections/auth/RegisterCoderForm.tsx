import { useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
// components
import {
  RHFTextField,
  FormProvider,
  Iconify,
} from "@ct-nx/components";
import { PATH_MAIN } from "@routes/paths";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { IoRocketSharp } from "react-icons/io5";
import {
  useRegisterManagerProfileMutation,
  useRegisterMutation,
} from "src/redux/services/auth";
import { useCreateClassMutation } from "src/redux/services/student/classes-manager";
import JoinCodeDialog from "./JoinCodeDialog";

// ----------------------------------------------------------------------

interface FormValuesProps {
  email: string;
  password: string;
}

export default function RegisterCoderForm(): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [createClass, { isLoading: isCreateClassLoading }] =
    useCreateClassMutation();
  const [registerManagerProfile, { isLoading: isManagerLoading }] =
    useRegisterManagerProfileMutation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      const { user } = await registerManagerProfile({
        ...data,
        first_name: "Happy",
        last_name: "Cat",
      }).unwrap();
      const studentProfile = await register({
        ...data,
        first_name: "Happy",
        last_name: "Cat",
        manager_id: user.id,
      }).unwrap();
      localStorage.setItem("accessToken", studentProfile.access_token);
      await createClass({ name: "Happy Tribe" }).unwrap();
      router.reload();
      router.replace(PATH_MAIN.root);
    } catch (e: any) {
      enqueueSnackbar("something went wrong", { variant: "error" });
      enqueueSnackbar(
        "if you have manager account, you must create student there",
        { variant: "error" }
      );
    }
  };

  return (
    <>
      <TextField
        id="join code"
        label="Do you have a join code?"
        variant="filled"
        fullWidth
        disabled
        sx={{ "& .MuiInputBase-root": { height: "52px" }, mb: "24px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <JoinCodeDialog>
                <Button>Apply Join Code</Button>
              </JoinCodeDialog>
            </InputAdornment>
          ),
        }}
      />
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
          loading={
            isSubmitting ||
            isLoading ||
            isManagerLoading ||
            isCreateClassLoading
          }
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
