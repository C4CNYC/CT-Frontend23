import { Control, Controller } from "react-hook-form";
import { TbInfoCircleFilled } from "react-icons/tb";

import { FormGroup, TextField, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { FormQuestProps } from "../helpers/quest.interface";

interface Props {
  name: "startDate" | "dueDate" | "closeDate";
  title: string;
  infoText: string;
  control: Control<FormQuestProps, any>;
}

export default function TimeController({
  name,
  title,
  control,
  infoText,
}: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <FormGroup>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            value={value}
            onChange={(event) => {
              onChange(event as string | React.ChangeEvent<Element>);
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                  "& .MuiInputBase-root": {
                    width: "200px",
                    background: theme.palette.mode === "light" ? "#fff" : "",
                    border:
                      theme.palette.mode === "light" ? "" : "1px solid #fff",
                  },
                  "& .MuiFormHelperText-root": {
                    ml: 0,
                  },
                }}
                error={!!error}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      fontStyle: "italic",
                      display: "inline-flex",
                      alignItems: "center",
                      color: error ? theme.palette.error.main : "error",
                    }}
                  >
                    {error ? (
                      error?.message
                    ) : (
                      <>
                        <TbInfoCircleFilled color="#D9D9D9" size={22} />
                        {infoText}
                      </>
                    )}
                  </Typography>
                }
                {...params}
              />
            )}
          />
        )}
      />
    </FormGroup>
  );
}
