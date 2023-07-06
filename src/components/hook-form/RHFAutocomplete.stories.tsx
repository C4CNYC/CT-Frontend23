import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFAutocomplete } from "./RHFAutocomplete";
import { FormProvider } from "./FormProvider";
import { voidFunction } from "@utils";

const Component: Meta<typeof RHFAutocomplete> = {
  component: RHFAutocomplete,
  title: "HookForm/RHFAutocomplete",
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

const TECH_OPTIONS = ["css", "html", "js"];

export const Default: Meta<typeof RHFAutocomplete> = {
    render: (args) => <ExampleComponent>
        <RHFAutocomplete {...args} />
        </ExampleComponent>,
    args: {
        name:"tags",
        label:"Technologies tags",
        multiple: true,
        freeSolo: true,
        options: TECH_OPTIONS.map((option) => option),
        ChipProps: { size: "small" },
  },
};
