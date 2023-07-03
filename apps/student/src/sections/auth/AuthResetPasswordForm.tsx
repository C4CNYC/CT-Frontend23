import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "src/redux/services/auth";
import * as Yup from "yup";
import {
  RHFTextField,
  FormProvider,
} from "@ct-nx/components";

// ----------------------------------------------------------------------

interface FormValuesProps {
  email: string;
}

export default function AuthResetPasswordForm(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [resetPassword] = useResetPasswordMutation();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await resetPassword({ email: data.email }).unwrap();
      enqueueSnackbar("Letter was send to your email");
      reset();
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
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
