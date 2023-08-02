import NextLink from "next/link";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Link, Stack, Typography } from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { PATH_AUTH } from "@routes/paths";
import { useAuthContext } from "src/auth/useAuthContext";

import EmailStep from "./emailStep";
import PasswordStep from "./passwordStep";

interface FormValuesProps {
  email: string;
  password: string;
}

export default function JoinTribeLogin(): React.ReactElement {
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const CreateLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLoginSchema),
    mode: "all",
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password, "codetribe");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <Stack alignItems="center" position="relative">
      <Typography variant="h4">Join this tribe</Typography>
      <Typography variant="body1">Sing in to join</Typography>
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
      <Link
        component={NextLink}
        href={PATH_AUTH.onBoardingStudent}
        underline="none"
        sx={{
          mt: 4,
          color: "inherit",
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Typography variant="body1">This is my first time</Typography>|
        <Typography variant="subtitle1">REGISTER</Typography>
      </Link>
    </Stack>
  );
}
