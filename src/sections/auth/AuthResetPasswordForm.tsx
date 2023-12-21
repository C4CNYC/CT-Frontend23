import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";

import { FormProvider, RHFTextField } from "@components";
import { useResetPasswordMutation } from "src/redux/services/auth";
import { useTranslate } from "src/utils/translateHelper";

import { PATH_AUTH } from "../../routes/paths";

// ----------------------------------------------------------------------

interface FormValuesProps {
  email: string;
}

export default function AuthResetPasswordForm(): React.ReactElement {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate("required_email"))
      .email(translate("must_be_valid_email")),
  });
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await resetPassword(data).unwrap();
      enqueueSnackbar(translate("messages_has_been_sent"));
      push(PATH_AUTH.signIn);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label={translate("email_address")} />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{ mt: 3 }}
      >
        {translate("actions_send_request")}
      </LoadingButton>
    </FormProvider>
  );
}
