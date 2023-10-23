import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";

import { RegisterStudenTeacher, SingLink } from "../links";
import AddSchool from "./AddSchool";
import AddTeacher from "./AddTeacher";
import SingUp from "./SingUp";
import StepperProgress from "./StepperProgress";
import WelcomeStep from "./WelcomeStep";
import { Role } from "src/redux/services/enums/role.enum";

interface FormValuesProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const CreateEmailSchema = Yup.object().shape({
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

export default function TeacherStepper(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const { register } = useAuthContext();

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  const goToStep = (step: number) => {
    setActiveStep(step);
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateEmailSchema),
    mode: "all",
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await register(data.email, data.password, data.firstName, data.lastName, Role.Manager);
    } catch (error) {
      methods.setError("root", {
        ...error,
        message: error.message,
      });
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Stack
      sx={{
        minHeight: "460px",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <RegisterStudenTeacher isTeacher />
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {activeStep === 0 && <WelcomeStep nextStep={nextStep} />}
        {activeStep === 1 && (
          <SingUp
            goToStep={goToStep}
            nextStep={nextStep}
            prevStep={prevStep}
            isValid={
              !methods.formState.errors.email &&
              methods.formState.dirtyFields.email
            }
            isTeacher={true}
          />
        )}
        {(activeStep === 2 || activeStep === 3) && (
          <StepperProgress prevStep={prevStep} activeStep={activeStep} />
        )}
        {activeStep === 2 && (
          <AddTeacher
            nextStep={nextStep}
            isSubmiting={methods.formState.isSubmitting}
            isSubmitSuccessful={methods.formState.isSubmitSuccessful}
          />
        )}
      </FormProvider>

      {activeStep === 3 && <AddSchool />}
      <SingLink />
    </Stack>
  );
}
