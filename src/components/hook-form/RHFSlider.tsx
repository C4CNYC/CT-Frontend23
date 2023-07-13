// form
import { Controller, useFormContext } from "react-hook-form";

// @mui
import { FormHelperText, Slider, SliderProps } from "@mui/material";

// ----------------------------------------------------------------------

type Props = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
};

export function RHFSlider({
  name,
  helperText,
  ...other
}: Props): React.ReactElement | null {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
