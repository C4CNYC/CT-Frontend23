import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StepWizard from "react-step-wizard";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider } from "@components";

import { RegisterStudenTeacher, SingLink } from "../links";
import SingUp from "../teacher/SingUp";
import RegisterStudent from "./RegisterStudent";

export interface FormValuesProps {
  email: string;
  birth_date: string;
}

export default function StudentStepper(): React.ReactElement {
  const CreateRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateRegisterSchema),
  });

  const onSubmit = (data: FormValuesProps) => {
    console.log(data);
  };
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack
        sx={{
          minHeight: "650px",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <RegisterStudenTeacher />
        <StepWizard transitions={custom}>
          <SingUp isValid={methods.formState.isValid} isTeacher={false} />
          <RegisterStudent control={methods.control} />
        </StepWizard>
        <SingLink />
      </Stack>
    </FormProvider>
  );
}
const custom = {};
