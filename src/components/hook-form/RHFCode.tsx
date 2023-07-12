import CodeMirror from "@uiw/react-codemirror";
import { Controller, useFormContext } from "react-hook-form";

import { FormHelperText } from "@mui/material";

interface RHFCodeProps {
  name: string;
  height?: string;
  extensions?: any;
  placeholder: string;
  helperText?: React.ReactNode;
}

export function RHFCode({
  name,
  helperText,
  ...other
}: RHFCodeProps): React.ReactElement {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div style={{ width: "100%" }}>
          <CodeMirror {...field} {...other} value={field.value || ""} />

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
