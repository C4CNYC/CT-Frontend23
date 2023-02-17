import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
} from "../../../../components/hook-form";
import { useUdpateAssigmentMutation } from "../../../../redux/services/manager";
import { IAssigment } from "src/redux/services/interfaces/assigment.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { AssigmentComplexity } from "src/redux/services/enums/assigment-complexity.enum";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const TECH_OPTIONS = ["css", "html", "js"];

const DRILLDOWN_OPTIONS = ["theme", "files", "grid"];

type AssignmentStepProps = {
  next: () => void;
  back: () => void;
  assignmentId: string;
  assigment?: IAssigment & BaseResponseInterface;
  school_id: string;
};

type FormValuesProps = {
  complexity: AssigmentComplexity;
  duration: string;
};

export default function AssignmentAbout({
  next,
  back,
  assigment,
  school_id,
  assignmentId,
}: AssignmentStepProps) {
  const [updateAssignment, { isLoading }] = useUdpateAssigmentMutation();

  const defaultValues = {
    complexity: assigment?.complexity,
    duration: assigment?.duration ? `${assigment.duration.hours} H` : ""
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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      updateAssignment({
        school_id,
        assigment_id: assignmentId,
        duration: data.duration,
        complexity: data.complexity,
      });
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
            <option key="empty" value="null">

            </option>
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
            <option key="empty" value="null">

            </option>
            {Object.keys(AssigmentComplexity).map((c) => (
              <option
                key={c}
                value={
                  AssigmentComplexity[c as keyof typeof AssigmentComplexity]
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
