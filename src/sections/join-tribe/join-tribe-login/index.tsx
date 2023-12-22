import { useRouter } from "next/router";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button, Stack, Typography } from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useAuthContext } from "src/auth/useAuthContext";
import { useTranslate } from "src/utils/translateHelper";

import EmailStep from "./email-step";
import PasswordStep from "./password-step";

interface FormValuesProps {
  email: string;
  password: string;
}

interface IJoinTribeLoginProps {
  handleChangeAuthorization: () => void;
  classId: string;
}

export default function JoinTribeLogin({
  handleChangeAuthorization,
  classId,
}: IJoinTribeLoginProps): React.ReactElement {
  const { push, query } = useRouter();
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [currentStep, setCurrentStep] = useState(0);
  const translate = useTranslate();

  const CreateLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate("required_email"))
      .email(translate("must_be_valid_email")),
    password: Yup.string().required(translate("required_password")),
  });

  const nextStep = (): void => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = (): void => {
    setCurrentStep(currentStep - 1);
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLoginSchema),
    mode: "all",
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await login(data.email, data.password, "codetribe");
      push(
        `${STUDENT_PATH_DASHBOARD.class.id(classId)}?` +
          `${new URLSearchParams({ joinCode: query.id as string })}`
      );
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Stack alignItems="center" position="relative">
      <Typography variant="h4">{translate("tribes_join_tribe")}</Typography>
      <Typography variant="body1">
        {translate("tribes_sign_in_to_join")}
      </Typography>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <EmailStep
            nextStep={nextStep}
            isValid={
              !methods.formState.errors.email &&
              methods.formState.dirtyFields.email
            }
          />
        )}
        {currentStep === 1 && (
          <PasswordStep
            prevStep={prevStep}
            isSubmiting={methods.formState.isSubmitting}
          />
        )}
      </FormProvider>
      <Button
        onClick={handleChangeAuthorization}
        sx={{
          mt: 4,
          color: "inherit",
          display: "flex",
          gap: 1,
          alignItems: "center",
          p: 0,
          "&:hover": {
            background: "none",
          },
        }}
      >
        <Typography variant="body1">
          {translate("login_my_first_time")}
        </Typography>
        |
        <Typography variant="subtitle1">
          {translate("login_register")}
        </Typography>
      </Button>
    </Stack>
  );
}
