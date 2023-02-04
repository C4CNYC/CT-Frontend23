// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextFieldProps } from "@mui/material";
import {MuiColorInput} from "mui-color-input";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFColorField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiColorInput
          {...field}
          value={field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          isAlphaHidden
          format="hex"
          {...other}
        />
      )}
    />
  );
}
