import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { voidFunction } from "@utils";

import { FormProvider } from "./FormProvider";
import { RHFUploadAvatar } from "./RHFUpload";

const Component: Meta<typeof RHFUploadAvatar> = {
  component: RHFUploadAvatar,
  title: "HookForm/RHFUploadAvatar",
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

export const Default: Meta<typeof RHFUploadAvatar> = {
  render: (args) => (
    <ExampleComponent>
      <RHFUploadAvatar {...args} />
    </ExampleComponent>
  ),
  args: {
    name: "tags",
    helperText: "Helper text",
    placeholder: "placeholder",
  },
};
