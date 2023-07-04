import { RHFTextField, FormProvider } from "@ct-nx/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { BaseResponseInterface } from "@ct-nx/utils";
import * as Yup from "yup";
import { useUdpateAssignmentMutation } from "../../../../redux/services/manager/assignments-manager";

interface AssignmentStepProps {
  next: () => void;
  back: () => void;
  assignment?: IAssignment & BaseResponseInterface;
  assignmentId: string;
  schoolId: string;
}

interface FormValuesProps {
  class: string;
  end_date: string;
  start_date: string;
  notes: string;
  graded: boolean;
  points: string;
}

export default function AssignmentAssigning({
  back,
  assignmentId,
  assignment,
  schoolId,
  next,
}: AssignmentStepProps): React.ReactElement | null {
  const [updateAssignment, { isLoading }] = useUdpateAssignmentMutation();

  const defaultValues = {
    class: "",
    end_date: assignment?.end_date ?? new Date().toISOString(),
    start_date: assignment?.start_date ?? new Date().toISOString(),
    notes: "",
    graded: false,
    points: "",
  };

  const createAssignmentSchema = Yup.object().shape({
    end_date: Yup.string().required("End date is required"),
    start_date: Yup.string().required("Start date is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(createAssignmentSchema),
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      updateAssignment({
        schoolId,
        assignmentId,
        start_date: data.start_date,
        end_date: data.end_date,
      });
      next();
    } catch (e: any) {
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
                  onChange(event as string | React.ChangeEvent<Element>);
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
                  onChange(event as string | React.ChangeEvent<Element>);
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
