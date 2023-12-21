import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button, Stack, Typography } from "@mui/material";

import { FormProvider } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";
import { Role } from "src/redux/services/enums/role.enum";
import { useTranslate } from "src/utils/translateHelper";

import EmailStep from "./email-step";
import PasswordStep from "./password-step";

interface FormValuesProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface IJoinTribeRegisterProps {
  handleChangeAuthorization: () => void;
}

export default function JoinTribeRegister({
  handleChangeAuthorization,
}: IJoinTribeRegisterProps): React.ReactElement {
  const { register, login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [currentStep, setCurrentStep] = useState(0);
  const translate = useTranslate();

  const CreateRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate("required_email"))
      .email(translate("must_be_valid_email")),
    firstName: Yup.string().required(translate("enter_name")),
    lastName: Yup.string().required(translate("enter_surname")),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        translate("required_password_includes")
      )
      .min(10, translate("required_password_length")),
  });

  const nextStep = (): void => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = (): void => {
    setCurrentStep(currentStep - 1);
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateRegisterSchema),
    mode: "all",
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.Student,
      });
      await login(data.email, data.password, "codetribe");
      enqueueSnackbar(translate("register_successfully"));
    } catch (error) {
      methods.setError("root", {
        ...error,
        message: error.message,
      });
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Stack alignItems="center" position="relative">
      <Typography variant="h4">{translate("home_join_tribe")}</Typography>
      <Typography variant="body1">
        {translate("tribes_sign_up_to_join")}
      </Typography>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <EmailStep
            nextStep={nextStep}
            isValid={
              !methods.formState.errors.email &&
              methods.formState.dirtyFields.email
            }
          />
        )}
        {currentStep === 1 && (
          <PasswordStep
            prevStep={prevStep}
            isSubmiting={methods.formState.isSubmitting}
          />
        )}
      </FormProvider>
      <Button
        onClick={handleChangeAuthorization}
        sx={{
          mt: 4,
          color: "inherit",
          display: "flex",
          gap: 1,
          alignItems: "center",
          p: 0,
          "&:hover": {
            background: "none",
          },
        }}
      >
        <Typography variant="body1">{translate("login_been_here")}</Typography>|
        <Typography variant="subtitle1">{translate("login")}</Typography>
      </Button>
    </Stack>
  );
}
