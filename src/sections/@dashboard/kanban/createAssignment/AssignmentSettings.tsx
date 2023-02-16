import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
  RHFSelect,
  RHFSwitch,
} from "../../../../components/hook-form";
import { useCreateAssigmentMutation } from "../../../../redux/services/manager";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { AssigmentTypes } from "src/redux/services/enums/assigment-types.enum";
import { AssigmentStatuses } from "src/redux/services/enums/assigment-status.enum";

type AssignmentStepProps = {
  next: () => void;
  school_id: string;
  getAssignmentId: (param: string) => void;
};

type FormValuesProps = {
  type: string;
  course: string;
  lesson: string;
  publish: boolean;
  name: string;
};

export default function AssignmentSettings({
  next,
  getAssignmentId,
  school_id,
}: AssignmentStepProps) {
  const [createAssignment, { isLoading }] = useCreateAssigmentMutation();
  const board = useSelector((state: RootState) => state.kanban.board);
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    type: "coding_idea",
    course: "",
    lesson: "",
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const backlogCol = board.columns[AssigmentStatuses.BACKLOG];
    const idCardWithMinOrder = backlogCol.cardIds[0];

    try {
      const assignment = await createAssignment({
        school_id,
        type: data.type,
        name: "(Draft)",
        meta: {
          order: idCardWithMinOrder
            ? parseFloat(board.cards[idCardWithMinOrder].meta.order as string) /
              2
            : 1,
        },
      });
      getAssignmentId(assignment?.data?.id);
      next();
    } catch (e) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            New assignment
          </Typography>

          <RHFSelect
            native
            name="type"
            label="Select Type"
            style={{ marginBottom: "20px" }}
          >
            <option key="coding_idea" value="coding_idea">
              Coding idea
            </option>
          </RHFSelect>

          <RHFSelect
            native
            name="course"
            label="Select Course"
            style={{ marginBottom: "20px" }}
          >
            <option key="empty" value="en"></option>
            <option key="course1" value="course1">
              Course of assignment 1
            </option>
            <option key="course2" value="course2">
              Course of assignment 2
            </option>
          </RHFSelect>

          <RHFSelect
            native
            name="lesson"
            label="Select Course"
            style={{ marginBottom: "20px" }}
          >
            <option key="empty" value="en"></option>
            <option key="lesson1" value="lesson1">
              Lesson of assignment 1
            </option>
            <option key="lesson2" value="lesson2">
              Lesson of assignment 2
            </option>
          </RHFSelect>

          <RHFSwitch
            name="publish"
            label="Publish"
            labelPlacement="start"
            sx={{
              mb: 1,
              mx: 0,
              width: 1,
              justifyContent: "flex-end",
            }}
          />
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
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
    </>
  );
}
