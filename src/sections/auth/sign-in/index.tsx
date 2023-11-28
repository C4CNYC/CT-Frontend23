import { useRouter } from "next/router";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StepWizard from "react-step-wizard";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider } from "@components";
import { SingLink } from "@sections/on-boarding-register/links";
import { useAuthContext } from "src/auth/useAuthContext";
import { STUDENT_PATH_AFTER_LOGIN } from "src/config-global";

import EmailNotFound from "./EmailNotFound";
import SignInLogin from "./SignInLogin";
import SignInPassword from "./SignInPassword";

interface FormValuesProps {
  email: string;
  password: string;
}
export default function SignInMain(): React.ReactElement {
  const { replace } = useRouter();
  const { login } = useAuthContext();
  const [isError, setError] = useState("");

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
      replace(STUDENT_PATH_AFTER_LOGIN);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Stack
      sx={{
        minHeight: "400px",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <StepWizard transitions={custom}>
          <SignInLogin
            isValid={
              !methods.formState.errors.email &&
              methods.formState.dirtyFields.email
            }
            stepName="email"
          />
          <SignInPassword
            isSubmiting={methods.formState.isSubmitting}
            isError={isError}
            stepName="password"
          />
          <EmailNotFound setError={setError} />
        </StepWizard>
      </FormProvider>
      <SingLink isRegister />
    </Stack>
  );
}
const custom = {};
