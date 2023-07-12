import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { voidFunction } from "@utils";

import { FormProvider } from "./FormProvider";
import { RHFCheckbox } from "./RHFCheckbox";

const Component: Meta<typeof RHFCheckbox> = {
  component: RHFCheckbox,
  title: "HookForm/RHFCheckbox",
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

export const Default: Meta<typeof RHFCheckbox> = {
  render: (args) => (
    <ExampleComponent>
      <RHFCheckbox {...args} />
    </ExampleComponent>
  ),
  args: {
    name: "tags",
    helperText: "Helper text",
    label: "Label",
    labelPlacement: "end",
    required: true,
  },
};
