import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { voidFunction } from "@utils";

import { FormProvider } from "./FormProvider";
import { RHFSelect } from "./RHFSelect";

const Component: Meta<typeof RHFSelect> = {
  component: RHFSelect,
  title: "HookForm/RHFSelect",
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

export const Default: Meta<typeof RHFSelect> = {
  render: (args) => (
    <ExampleComponent>
      <RHFSelect {...args} />
    </ExampleComponent>
  ),
  args: {
    name: "tags",
    helperText: "Helper text",
    label: "Label",
    placeholder: "placeholder",
    sx: {
      width: "100%",
    },
    children: (
      <>
        <option key="first value" value="first value">
          First value
        </option>
        <option key="second value" value="second value">
          Second value
        </option>
        <option key="thirs value" value="thirs value">
          Third value
        </option>
        <option key="fourth value" value="fourth value">
          Fourth value
        </option>
        <option key="fifth value" value="fifth value">
          Fifth value
        </option>
      </>
    ),
  },
};
