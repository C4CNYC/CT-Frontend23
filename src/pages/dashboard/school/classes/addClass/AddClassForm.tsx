import FormProvider from "@components/hook-form";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useForm } from "react-hook-form";
import AddClassInput from "./AddClassInput";

interface FormValuesProps {
  code1: string;
}

export default function AddClassForm(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    code1: "",
  };

  const methods = useForm({
    mode: "onChange",
    // resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      console.log("DATA");
      enqueueSnackbar("Verify success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <AddClassInput />
    </FormProvider>
  );
}
