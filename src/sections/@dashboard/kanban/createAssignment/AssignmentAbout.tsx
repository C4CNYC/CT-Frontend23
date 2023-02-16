import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, { RHFAutocomplete, RHFSelect } from "../../../../components/hook-form";
import { useUdpateAssigmentMutation } from "../../../../redux/services/manager";

const TECH_OPTIONS = [
  "css", "html", "js"
];

const DRILLDOWN_OPTIONS = [
  "theme", "files", "grid"
];


type AssignmentStepProps = {
  next: () => void;
  back: () => void;
  assignmentId: string;
  school_id: string;
};


type FormValuesProps = {
  name: string;
  description: string;
  tags: string;
};

export default function AssignmentAbout({ next, back, school_id, assignmentId }: AssignmentStepProps) {
  const [updateAssignment, { isLoading }] = useUdpateAssigmentMutation();

  const defaultValues = {
    description: ""
  };

  const methods = useForm<FormValuesProps>({
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      updateAssignment({
        school_id,
        assigment_id: assignmentId,
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
          New assignment about
        </Typography>

        <RHFAutocomplete
          name="tags"
          label="Technologies tags"
          multiple
          freeSolo
          options={TECH_OPTIONS.map((option) => option)}
          ChipProps={{ size: "small" }}
        />

        <RHFAutocomplete
          name="drilldown"
          label="Drilldown tags"
          multiple
          freeSolo
          options={DRILLDOWN_OPTIONS.map((option) => option)}
          ChipProps={{ size: "small" }}
        />

        <RHFSelect
          native
          name="lesson"
          label="Target grade"
          style={{marginBottom: '20px'}}
        >
          <option key="empty" value="en"></option>
          <option key="grade1" value="grade1">
            Grade 1
          </option>
          <option key="grade2" value="grade2">
            Grade 2
          </option>
        </RHFSelect>

        <RHFSelect
          native
          name="lesson"
          label="Select difficulty level"
          style={{marginBottom: '20px'}}
        >
          <option key="empty" value="en"></option>
          <option key="level1" value="level1">
            level 1
          </option>
          <option key="level2" value="level2">
            level 2
          </option>
        </RHFSelect>

        <RHFSelect
          native
          name="time"
          label="Time to complete"
          style={{marginBottom: '20px'}}
        >
          <option key="empty" value="en"></option>
          <option key="1h" value="1h">
            1h
          </option>
          <option key="2h" value="2h">
           2h
          </option>
        </RHFSelect>

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
