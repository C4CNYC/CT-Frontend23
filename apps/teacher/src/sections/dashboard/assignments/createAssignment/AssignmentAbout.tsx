import {
  RHFAutocomplete,
  RHFSelect,
  FormProvider,
} from "@ct-nx/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { AssignmentComplexity } from "src/redux/services/enums/assignment-complexity.enum";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { BaseResponseInterface } from "@ct-nx/utils";
import * as Yup from "yup";
import { useUdpateAssignmentMutation } from "../../../../redux/services/manager/assignments-manager";

const TECH_OPTIONS = ["css", "html", "js"];

const DRILLDOWN_OPTIONS = ["theme", "files", "grid"];

interface AssignmentStepProps {
  next: () => void;
  back: () => void;
  assignmentId: string;
  assignment?: IAssignment & BaseResponseInterface;
  schoolId: string;
}

interface FormValuesProps {
  complexity: AssignmentComplexity;
  duration: string;
}

export default function AssignmentAbout({
  next,
  back,
  assignment,
  schoolId,
  assignmentId,
}: AssignmentStepProps): React.ReactElement | null {
  const [updateAssignment, { isLoading }] = useUdpateAssignmentMutation();

  const defaultValues = {
    complexity: assignment?.complexity,
    duration: assignment?.duration ? `${assignment.duration.hours} H` : "",
  };

  const createAssignmentSchema = Yup.object().shape({
    complexity: Yup.string().required("Complexity is required"),
    duration: Yup.string().required("Duration is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(createAssignmentSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateAssignment({
        schoolId,
        assignmentId,
        duration: data.duration,
        complexity: data.complexity,
      }).unwrap();
      next();
    } catch (e) {
      // #TODO show error
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5} sx={{ mb: 5, position: "relative" }}>
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <RHFSelect
            sx={{ width: "47%" }}
            native
            name="duration"
            label="Time to complete"
          >
            <option key="empty" value="null"></option>
            <option key="0.25h" value="0.25 H">
              0.25h
            </option>
            <option key="0.5h" value="0.5 H">
              0.5h
            </option>
            <option key="1h" value="1 H">
              1h
            </option>
            <option key="1h" value="1 H">
              1.5h
            </option>
            <option key="2h" value="2 H">
              2h
            </option>
            <option key="3h" value="3 H">
              3h
            </option>
          </RHFSelect>

          <RHFSelect
            native
            name="complexity"
            label="Select complexity level"
            sx={{ width: "47%" }}
          >
            <option key="empty" value="null"></option>
            {Object.keys(AssignmentComplexity).map((c) => (
              <option
                key={c}
                value={
                  AssignmentComplexity[c as keyof typeof AssignmentComplexity]
                }
              >
                {c}
              </option>
            ))}
          </RHFSelect>
        </Stack>

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
              bgcolor: "#FBDD3F",
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
