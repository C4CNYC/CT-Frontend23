import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button, Stack, Typography } from "@mui/material";

import { FormProvider } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";

import EmailStep from "./email-step";
import PasswordStep from "./password-step";
import { Role } from "src/redux/services/enums/role.enum";

interface FormValuesProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const CreateRegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  firstName: Yup.string().required("Enter your name"),
  lastName: Yup.string().required("Enter your surname"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must include at least one uppercase letter, one lowercase letter, and one numeric digit"
    )
    .min(10, "Password must be at least 10 characters long"),
});

interface IJoinTribeRegisterProps {
  handleChangeAuthorization: () => void;
}

export default function JoinTribeRegister({
  handleChangeAuthorization,
}: IJoinTribeRegisterProps): React.ReactElement {
  const { register, login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [currentStep, setCurrentStep] = useState(0);

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
      await register({ email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName, role: Role.Student });
      await login(data.email, data.password, "codetribe");
      enqueueSnackbar("Registered successfully!");
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
      <Typography variant="h4">Join this tribe</Typography>
      <Typography variant="body1">Sign up to join</Typography>
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
        <Typography variant="body1">I’ve been here before</Typography>|
        <Typography variant="subtitle1">LOGIN</Typography>
      </Button>
    </Stack>
  );
}
