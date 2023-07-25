import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StepWizard from "react-step-wizard";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider } from "@components";
import { useAuthContext } from "src/auth/useAuthContext";

import { RegisterStudenTeacher, SingLink } from "../links";
import SingUp from "../teacher/SingUp";
import RegisterStudent from "./RegisterStudent";

export interface FormValuesProps {
  email: string;
  firstName: string;
  surname: string;
  password: string;
  birthDate: string;
  country: string;
}

export default function StudentStepper(): React.ReactElement {
  const { register } = useAuthContext();

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
  console.log(methods.getValues(), methods.formState.isValid);
  const onSubmit = async (data: FormValuesProps) => {
    try {
      const user = await register(
        data.email,
        data.password,
        data.firstName,
        data.surname
      );
      console.log(user, "user");
    } catch (error) {}
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
          <SingUp
            isValid={
              !methods.formState.errors.email &&
              methods.formState.dirtyFields.email
            }
            isTeacher={false}
          />
          <RegisterStudent
            control={methods.control}
            onSubmit={methods.handleSubmit(onSubmit)}
          />
        </StepWizard>
        <SingLink />
      </Stack>
    </FormProvider>
  );
}
const custom = {};
