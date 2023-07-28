import { Control, Controller } from "react-hook-form";
import { TbInfoCircleFilled } from "react-icons/tb";

import { FormGroup, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { FormProps } from "./AddQuestsModal";

interface Props {
  name: "startDate" | "dueDate" | "closeDate";
  title: string;
  infoText: string;
  setDate: (s: string) => void;
  data: Date | string;
  control: Control<FormProps, any>;
}

export default function TimeController({
  name,
  title,
  setDate,
  data,
  control,
  infoText,
}: Props): React.ReactElement {
  return (
    <FormGroup>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...restField } }) => (
          <DatePicker
            value={data}
            onChange={(event) => {
              onChange(event as string | React.ChangeEvent<Element>);
              setDate(event as string);
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                  "& .MuiInputBase-root": {
                    width: "200px",
                    background: "#F7F7FC",
                  },
                  "& .MuiFormHelperText-root": {
                    ml: 0,
                  },
                }}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      fontStyle: "italic",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <TbInfoCircleFilled color="#D9D9D9" size={22} />
                    {infoText}
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
