import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StepWizard from "react-step-wizard";
import * as Yup from "yup";

import { Stack } from "@mui/material";

import { FormProvider } from "@components";
import { SingLink } from "@sections/on-boarding-login/links";

import SingInLogin from "./SingInLogin";
import SingInPassword from "./SingInPassword";

interface FormValuesProps {
  email: string;
}
export default function SingInMain(): React.ReactElement {
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
