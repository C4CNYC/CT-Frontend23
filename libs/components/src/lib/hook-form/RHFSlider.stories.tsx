import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFSlider } from "./RHFSlider";
import { FormProvider } from "./FormProvider";

const Component: Meta<typeof RHFSlider> = {
  component: RHFSlider,
  title: "HookForm/RHFSlider",
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
            methods={methods} onSubmit={handleSubmit(() => console.log(1))}
        >
            {children}
        </FormProvider>
    )
}

export const Default: Meta<typeof RHFSlider> = {
    render: (args) => <ExampleComponent>
        <RHFSlider {...args} />
        </ExampleComponent>,
    args: {
        name: "tags",
        helperText: "Helper text",
        placeholder: "placeholder",
        sx: {
            width: "100%"
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
