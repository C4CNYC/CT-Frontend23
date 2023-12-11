import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";
import { Role } from "src/redux/services/enums/role.enum";
import { useTranslate } from "src/utils/translateHelper";

import { RegisterStudenTeacher, SingLink } from "../links";
import AddSchool from "./AddSchool";
import AddTeacher from "./AddTeacher";
import SingUp from "./SingUp";
import StepperProgress from "./StepperProgress";
import WelcomeStep from "./WelcomeStep";

interface FormValuesProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function TeacherStepper(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const { register } = useAuthContext();
  const translate = useTranslate();

  const CreateEmailSchema = Yup.object().shape({
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
      //#TODO update type here
      //@ts-ignore
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.Manager,
      });
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
