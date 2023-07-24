import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StepWizard from "react-step-wizard";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { SingLink } from "@sections/on-boarding-login/links";

import SingInLogin from "./SingInLogin";
import SingInPassword from "./SingInPassword";
import { useAuthContext } from "src/auth/useAuthContext";
import { useRouter } from "next/router";
import { STUDENT_PATH_AFTER_LOGIN } from "src/config-global";

interface FormValuesProps {
  email: string;
  password: string;
}
export default function SingInMain(): React.ReactElement {
  const { replace } = useRouter();
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const CreateEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateEmailSchema),
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password, "codetribe");
      replace(STUDENT_PATH_AFTER_LOGIN);
    } catch (e) {
      enqueueSnackbar("WRONG CREDENTIAL", { variant: "error" })
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
          <SingInLogin isValid={methods.formState.isValid} />
          <SingInPassword />
        </StepWizard>
      </FormProvider>
      <SingLink isRegister />
    </Stack>
  );
}
const custom = {};
