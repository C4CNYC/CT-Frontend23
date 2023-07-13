import * as React from "react";

import { useForm } from "react-hook-form";

import { Box, Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { FormProvider, RHFTextField } from "@components";
import { useUdpateAssignmentMutation } from "src/redux/services/manager/assignments-manager";

interface AssignmentStepProps {
  next: () => void;
  back: () => void;
  schoolId: string;
  assignmentId: string;
}

interface FormValuesProps {
  name: string;
  description: string;
}

export default function AssignmentContent({
  next,
  back,
  schoolId,
  assignmentId,
}: AssignmentStepProps): React.ReactElement | null {
  const [updateAssignment, { isLoading }] = useUdpateAssignmentMutation();

  const defaultValues = {
    name: "",
    description: "",
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any): Promise<void> => {
    try {
      updateAssignment({
        schoolId,
        assignmentId,
        name: data.name,
      });
      next();
    } catch (e: any) {
      // #TODO show error
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          New assignment
        </Typography>

        <RHFTextField
          name="name"
          label="Assignment name"
          style={{ marginBottom: "20px" }}
        />

        <RHFTextField
          multiline
          rows={8}
          name="description"
          label="Assignment description"
          style={{ marginBottom: "20px" }}
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
