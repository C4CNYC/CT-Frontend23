import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StepWizard from "react-step-wizard";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider } from "@components";

import { RegisterStudenTeacher, SingLink } from "../links";
import RegisterStep from "./RegisterStep";
import SingUp from "./SingUp";
import WelcomeStep from "./WelcomeStep";

interface FormValuesProps {
  email: string;
}

export default function TeacherStepper(): React.ReactElement {
  const CreateEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateEmailSchema),
  });

  const onSubmit = (data: FormValuesProps) => {
    console.log(data);
  };
  return (
    <Stack
      sx={{
        minHeight: "600px",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <RegisterStudenTeacher isTeacher />
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <StepWizard transitions={custom}>
          <WelcomeStep />
          <SingUp isValid={methods.formState.isValid} isTeacher={true} />
          <RegisterStep />
        </StepWizard>
      </FormProvider>
      <SingLink />
    </Stack>
  );
}
const custom = {};
