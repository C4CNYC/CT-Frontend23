import * as Yup from "yup";
import { useForm } from "react-hook-form";
import type { Meta } from "@storybook/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { voidFunction } from "@utils";

import { RHFSwitch } from "./RHFSwitch";
import { FormProvider } from "./FormProvider";

const Component: Meta<typeof RHFSwitch> = {
  component: RHFSwitch,
  title: "HookForm/RHFSwitch",
};

export default Component;

const ExampleComponent = ({children}: any) => {

    const VerifyCodeSchema = Yup.object().shape({

    });
    const defaultValues = {

    };

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
        <FormProvider
            methods={methods} onSubmit={handleSubmit(voidFunction)}
        >
            {children}
        </FormProvider>
    )
}

export const Default: Meta<typeof RHFSwitch> = {
    render: (args) => <ExampleComponent>
        <RHFSwitch {...args} />
        </ExampleComponent>,
    args: {
        name: "tags",
        helperText: "Helper text",
        placeholder: "placeholder",
        color: "secondary",
        label: "Label",
  },
};
