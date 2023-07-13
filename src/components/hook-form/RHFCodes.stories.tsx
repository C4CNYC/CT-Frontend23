import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { voidFunction } from "@utils";

import { FormProvider } from "./FormProvider";
import { RHFCodes } from "./RHFCodes";

const Component: Meta<typeof RHFCodes> = {
  component: RHFCodes,
  title: "HookForm/RHFCodes",
};

export default Component;

const ExampleComponent = ({ children }: any) => {
  const VerifyCodeSchema = Yup.object().shape({});
  const defaultValues = {};

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(voidFunction)}>
      {children}
    </FormProvider>
  );
};

const TECH_OPTIONS = ["css", "html", "js"];

export const Default: Meta<typeof RHFCodes> = {
  render: (args) => (
    <ExampleComponent>
      <RHFCodes {...args} />
    </ExampleComponent>
  ),
  args: {
    name: "tags",
    helperText: "Helper text",
    label: "Num",
    required: true,
    margin: "dense",
    keyName: "keyName",
    placeholder: "placeholder",
    inputs: ["input1", "input2"],
    sx: {
      width: "100%",
    },
  },
};
