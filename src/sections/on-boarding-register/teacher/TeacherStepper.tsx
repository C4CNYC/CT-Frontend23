import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
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
import { teacherStepperAtom } from "./teacher-stepper-atom";

interface FormValuesProps {
  email: string;
  firstName: string;
  surname: string;
  password: string;
}

export default function TeacherStepper(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep] = useAtom(teacherStepperAtom);
  const { register } = useAuthContext();

  const CreateEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    firstName: Yup.string().required("Enter your name"),
    surname: Yup.string().required("Enter your surname"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Password must include at least one uppercase letter, one lowercase letter, and one numeric digit"
      )
      .min(10, "Password must be at least 10 characters long"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateEmailSchema),
    mode: "all",
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await register(data.email, data.password, data.firstName, data.surname);
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
        minHeight: "550px",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <RegisterStudenTeacher isTeacher />
      <FormProvider methods={methods}>
        {activeStep === 0 && <WelcomeStep />}
        {activeStep === 1 && (
          <SingUp
            isValid={
              !methods.formState.errors.email &&
              methods.formState.dirtyFields.email
            }
            isTeacher={true}
          />
        )}
        {(activeStep === 2 || activeStep === 3) && <StepperProgress />}
        {activeStep === 2 && (
          <AddTeacher
            onSubmit={methods.handleSubmit(onSubmit)}
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
