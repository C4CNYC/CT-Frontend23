import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { voidFunction } from "@utils";

import { FormProvider } from "./FormProvider";
import { RHFSlider } from "./RHFSlider";

const Component: Meta<typeof RHFSlider> = {
  component: RHFSlider,
  title: "HookForm/RHFSlider",
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

export const Default: Meta<typeof RHFSlider> = {
  render: (args) => (
    <ExampleComponent>
      <RHFSlider {...args} />
    </ExampleComponent>
  ),
  args: {
    name: "tags",
    helperText: "Helper text",
    placeholder: "placeholder",
    sx: {
      width: "100%",
    },
    color: "secondary",
    max: 100,
    min: 0,
    orientation: "horizontal",
    size: "medium",
    track: "normal",
    valueLabelDisplay: "auto",
    value: 30,
  },
};
