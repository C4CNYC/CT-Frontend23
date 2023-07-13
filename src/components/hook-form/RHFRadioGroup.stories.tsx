import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { voidFunction } from "@utils";

import { FormProvider } from "./FormProvider";
import { RHFRadioGroup } from "./RHFRadioGroup";

const Component: Meta<typeof RHFRadioGroup> = {
  component: RHFRadioGroup,
  title: "HookForm/RHFRadioGroup",
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

export const Default: Meta<typeof RHFRadioGroup> = {
  render: (args) => (
    <ExampleComponent>
      <RHFRadioGroup {...args} />
    </ExampleComponent>
  ),
  args: {
    name: "tags",
    helperText: "Helper text",
    label: "Num",
    placeholder: "placeholder",
    sx: {
      width: "100%",
    },
    options: [
      { label: "label 1", value: "value 1" },
      { label: "label 2", value: "value 2" },
      { label: "label 3", value: "value 3" },
      { label: "label 4", value: "value 4" },
    ],
  },
};
