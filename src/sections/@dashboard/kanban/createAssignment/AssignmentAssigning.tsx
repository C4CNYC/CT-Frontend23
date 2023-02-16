import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import FormProvider, { RHFSwitch, RHFTextField } from "../../../../components/hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useUdpateAssigmentMutation } from "../../../../redux/services/manager";

type AssignmentStepProps = {
  next: () => void;
  back: () => void;
  assignmentId: string;
  school_id: string;
};


type FormValuesProps = {
  class: string;
  due_date: string;
  notes: string;
  graded: boolean;
  points: string;
};

export default function AssignmentAssigning({ back, assignmentId, school_id, next }: AssignmentStepProps) {
  const [updateAssignment, { isLoading }] = useUdpateAssigmentMutation();

  const defaultValues = {
    class: "",
    due_date: "",
    start_date: new Date(),
    notes: "",
    graded: false,
    points: ""
  };

  const methods = useForm<FormValuesProps>({
    defaultValues
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data: any) => {
    try {
      updateAssignment({
        school_id,
        assigment_id: assignmentId,
        start_date: data.start_date,
        end_date: data.end_date
      });
      next();
    } catch (e) {
      // #TODO show error
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          New assignment assigning
        </Typography>

        <RHFTextField
          name="class"
          label="Assign to class"
          style={{ marginBottom: "20px" }}
        />

        <Box sx={{ display: "flex", flexDirection: "row" }}>


          <Controller
            name="start_date"
            control={control}
            render={
              ({ field: { onChange, value, ...restField } }) =>
                <DateTimePicker
                  label="Start Date"
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth style={{marginRight: '10px'}}/>
                  )}
                />
            }
          />

          <Controller
            name="end_date"
            control={control}
            render={
              ({ field: { onChange, value, ...restField } }) =>
                <DateTimePicker
                  label="End Date"
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth style={{marginLeft: '10px'}}/>
                  )}
                />
            }
          />

        </Box>
        <RHFTextField
          multiline
          rows={8}
          name="name"
          label="Class notes"
          style={{ marginBottom: "20px" }}
        />

        <RHFSwitch
          name="graded"
          label="Graded"
          labelPlacement="start"
          sx={{
            mb: 1,
            mx: 0,
            width: 1,
            justifyContent: "flex-end"
          }}
        />

        <RHFTextField
          name="points"
          label="Points"
          type="number"
        />

      </Stack>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          disabled={isLoading}
          fullWidth
          type="submit"
          onClick={back}
          sx={{
            boxShadow: "0px 8px 16px rgba(196, 196, 196, 0.59)",
            bgcolor: "#FBDD3F",
            borderRadius: "50px",
            textTransform: "uppercase",
            fontSize: "22px",
            mr: 2,
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800"
            }
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
                theme.palette.mode === "light" ? "common.white" : "grey.800"
            }
          }}
        >
          Next
        </Button>
      </Box>
    </FormProvider>
  );
}
