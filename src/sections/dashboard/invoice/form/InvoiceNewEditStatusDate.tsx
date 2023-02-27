// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { MenuItem, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
// components
import { RHFSelect, RHFTextField } from "@components/hook-form";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["paid", "unpaid", "overdue", "draft"];

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate(): React.ReactElement {
  const { control, watch } = useFormContext();

  const values = watch();

  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{ p: 3, bgcolor: "background.neutral" }}
    >
      <RHFTextField
        disabled
        name="invoiceNumber"
        label="Invoice number"
        value={`INV-${values.invoiceNumber as string}`}
      />

      <RHFSelect
        fullWidth
        name="status"
        label="Status"
        InputLabelProps={{ shrink: true }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>

      <Controller
        name="createDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Date create"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Due date"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />
    </Stack>
  );
}
