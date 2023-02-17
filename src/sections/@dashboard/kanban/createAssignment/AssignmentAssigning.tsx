import * as React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useUdpateAssigmentMutation } from "../../../../redux/services/manager";

type AssignmentStepProps = {
  next: () => void;
  back: () => void;
  assignmentId: string;
  school_id: string;
};

type FormValuesProps = {
  class: string;
  end_date: string;
  start_date: string;
  notes: string;
  graded: boolean;
  points: string;
};

export default function AssignmentAssigning({
  back,
  assignmentId,
  school_id,
  next,
}: AssignmentStepProps) {
  const [updateAssignment, { isLoading }] = useUdpateAssigmentMutation();

  const defaultValues = {
    class: "",
    end_date: new Date().toISOString(),
    start_date: new Date().toISOString(),
    notes: "",
    graded: false,
    points: "",
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      updateAssignment({
        school_id,
        assigment_id: assignmentId,
        start_date: data.start_date,
        end_date: data.end_date,
      });
      next();
    } catch (e) {
      // #TODO show error
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5} sx={{ mb: 5, position: "relative" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Controller
            name="start_date"
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <DateTimePicker
                label="Start Date"
                value={value}
                onChange={(event) => {
                  onChange(event);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    style={{ marginRight: "10px" }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="end_date"
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <DateTimePicker
                label="End Date"
                value={value}
                onChange={(event) => {
                  onChange(event);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    style={{ marginLeft: "10px" }}
                  />
                )}
              />
            )}
          />
        </Box>

        <RHFTextField name="points" label="Points" type="number" />

        <RHFTextField name="class" label="Assign to class" />

        <RHFTextField multiline rows={8} name="name" label="Class notes" />
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          disabled={isLoading}
          fullWidth
          type="submit"
          onClick={back}
          sx={{
            boxShadow: "0px 8px 16px rgba(196, 196, 196, 0.59)",
            bgcolor: "text.primary",
            borderRadius: "50px",
            textTransform: "uppercase",
            fontSize: "22px",
            mr: 2,
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Back
        </Button>
        <Button
          disabled={isLoading}
          fullWidth
          type="submit"
          sx={{
            boxShadow: "0px 8px 16px rgba(196, 196, 196, 0.59)",
            bgcolor: "#FBDD3F",
            borderRadius: "50px",
            textTransform: "uppercase",
            fontSize: "22px",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </FormProvider>
  );
}
