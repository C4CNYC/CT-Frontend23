import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";

import { RegisterStudenTeacher, SingLink } from "../links";
import SingUp from "../teacher/SingUp";
import StepperInfo from "./StepperInfo";
import StepperProgres from "./StepperProgress";
import StepperRegister from "./StepperRegister";
import { studentStepperAtom } from "./student-stepper-atom";

interface FormValuesProps {
  email: string;
  firstName: string;
  surname: string;
  password: string;
}

export default function StudentStepper(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { register } = useAuthContext();
  const [activeStep] = useAtom(studentStepperAtom);

  const CreateRegisterSchema = Yup.object().shape({
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
    resolver: yupResolver(CreateRegisterSchema),
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const user = await register(
        data.email,
        data.password,
        data.firstName,
        data.surname
      );
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
      <RegisterStudenTeacher />
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <SingUp
            isValid={
              !methods.formState.errors.email &&
              methods.formState.dirtyFields.email
            }
            isTeacher={false}
          />
        )}
        {(activeStep === 1 || activeStep === 2) && <StepperProgres />}

        {activeStep === 1 && (
          <StepperRegister
            onSubmit={methods.handleSubmit(onSubmit)}
            isSubmiting={methods.formState.isSubmitting}
            isSubmitSuccessful={methods.formState.isSubmitSuccessful}
          />
        )}
      </FormProvider>
      {activeStep === 2 && <StepperInfo />}
      <SingLink />
    </Stack>
  );
}
