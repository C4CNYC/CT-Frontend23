import { countries } from "@assets/data";
import { Control, Controller } from "react-hook-form";

import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { RHFSelect } from "@components";

import { FormValuesProps } from "./StudentStepper";

interface Props {
  handleBack: () => void;
  control: Control<FormValuesProps, any>;
}
export default function StepperInfo({
  handleBack,
  control,
}: Props): React.ReactElement {
  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "baseline", ml: { xs: 3, sm: 3, md: 0 }, mt: 3 }}
      >
        <Typography variant="h3">Date of Birth</Typography>
        <Typography variant="h2" sx={{ display: "inline-flex", ml: 1 }}>
          🎂
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
        This helps us assign you to the right groups
      </Typography>
      <Controller
        name="birth_date"
        control={control}
        render={({ field: { onChange, value, ...restField } }) => (
          <DatePicker
            value={value}
            onChange={(event) => {
              onChange(event as string | React.ChangeEvent<Element>);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={(theme) => ({
                  "& .MuiInputBase-root": {
                    height: "52px",
                    background: theme.palette.grey[200],
                  },
                  "& fieldset": { border: "none" },
                })}
                margin="normal"
                fullWidth
                style={{ marginRight: "10px" }}
              />
            )}
          />
        )}
      />
      <Divider sx={{ my: 2 }}>&</Divider>
      <RHFSelect
        native
        name="country"
        label="Country"
        sx={(theme) => ({
          "& .MuiInputBase-root": {
            height: "52px",
            background: theme.palette.grey[200],
          },
          "& fieldset": { border: "none" },
        })}
      >
        <option key={"US"} value={"United States"}>
          United States
        </option>
        <option disabled>─────────────────────────</option>
        {countries
          .filter((el) => el.code !== "US")
          .map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
      </RHFSelect>
    </>
  );
}
