import * as React from "react";
import FormProvider from "../../../../components/hook-form";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import AddUserInput from "./AddUserInput";
import { useSnackbar } from "notistack";

type FormValuesProps = {
  code1: string;
};

export default function AddUserForm() {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    code1: ""
  };


  type Prop = {
    defaultValues?: FormValuesProps;
  };

  const methods = useForm({
    mode: "onChange",
    // resolver: yupResolver(VerifyCodeSchema),
    defaultValues
  });


  const {
    handleSubmit,
    formState: { isSubmitting, errors }
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log("DATA");
      enqueueSnackbar("Verify success!");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <AddUserInput />
    </FormProvider>
  );
}