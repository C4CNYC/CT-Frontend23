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

const TECH_OPTIONS = ["css", "html", "js"];

const DRILLDOWN_OPTIONS = ["theme", "files", "grid"];

type AssignmentStepProps = {
  next: () => void;
  back: () => void;
  assignmentId: string;
  assigment: IAssigment & BaseResponseInterface;
  school_id: string;
};

type FormValuesProps = {
  name: string;
  description: string;
  tags: string;
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
    description: "",
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
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
      <Stack spacing={5} sx={{ mb: 5, position: "relative" }}>
        <RHFSelect native name="time" label="Time to complete">
          <option key="empty" value="en">
            no limit
          </option>
          <option key="0.25h" value="0.25h">
            0.25h
          </option>
          <option key="0.5h" value="0.5h">
            0.5h
          </option>
          <option key="1h" value="1h">
            1h
          </option>
          <option key="1h" value="1h">
            1.5h
          </option>
          <option key="2h" value="2h">
            2h
          </option>
          <option key="2h" value="2h">
            3h
          </option>
        </RHFSelect>
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <RHFSelect
            native
            name="grade"
            label="Target grade"
            sx={{ width: "47%" }}
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
            name="level"
            label="Select difficulty level"
            sx={{ width: "47%" }}
          >
            <option key="empty" value="en"></option>
            <option key="level1" value="level1">
              level 1
            </option>
            <option key="level2" value="level2">
              level 2
            </option>
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
