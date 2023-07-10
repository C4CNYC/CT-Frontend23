import * as Yup from "yup";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";

import {
  RHFTextField,
  FormProvider,
 } from "@components";

import { PATH_AUTH } from "../../routes/paths";

import { useResetPasswordMutation } from "src/redux/services/auth";

interface FormValuesProps {
  email: string;
}

export default function AuthResetPasswordForm(): React.ReactElement {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await resetPassword(data).unwrap();
      enqueueSnackbar("The message has been sent to your email");
      push(PATH_AUTH.login);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{ mt: 3 }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
