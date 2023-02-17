import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from "../../../../components/hook-form";
import {
  useCreateAssigmentMutation,
  useUdpateAssigmentMutation,
} from "../../../../redux/services/manager";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { AssigmentTypes } from "src/redux/services/enums/assigment-types.enum";
import { AssigmentStatuses } from "src/redux/services/enums/assigment-status.enum";
import { IAssigment } from "src/redux/services/interfaces/assigment.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type AssignmentStepProps = {
  next: () => void;
  school_id: string;
  assigment?: IAssigment & BaseResponseInterface;
  getAssignmentId: (param: string) => void;
};

type FormValuesProps = {
  type: string;
  course: string;
  lesson: string;
  description: string;
  name: string;
};

export default function AssignmentSettings({
  assigment,
  next,
  getAssignmentId,
  school_id,
}: AssignmentStepProps) {
  const [createAssignment, { isLoading }] = useCreateAssigmentMutation();
  const [updateAssigment] = useUdpateAssigmentMutation();
  const board = useSelector((state: RootState) => state.kanban.board);
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: assigment?.name,
    description: assigment?.description,
    type: assigment?.type,
    course: "",
    lesson: "",
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const backlogCol = board.columns[AssigmentStatuses.BACKLOG];
    const idCardWithMinOrder = backlogCol.cardIds[0];

    try {
      if (assigment) {
        await updateAssigment({
          assigment_id: assigment.id,
          school_id,
          type: data.type,
          name: data.name,
          description: data.description,
        });
      } else {
        console.log(data.type);
        const assignment = await createAssignment({
          school_id,
          type: data.type,
          name: data.name,
          description: data.description,
          meta: {
            order: idCardWithMinOrder
              ? parseFloat(
                  board.cards[idCardWithMinOrder].meta.order as string
                ) / 2
              : 1,
          },
        }).unwrap();
        getAssignmentId(assignment?.id);
      }
      next();
    } catch (e) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} sx={{ mb: 5, position: "relative" }}>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <RHFTextField
              sx={{ width: "47%" }}
              name="name"
              label="Assignment name"
            />

            <RHFSelect
              sx={{ width: "47%" }}
              native
              name="type"
              label="Select Type"
            >
              <option value=""></option>
              {Object.keys(AssigmentTypes).map((t) => (
                <option
                  key={AssigmentTypes[t as keyof typeof AssigmentTypes]}
                  value={AssigmentTypes[t as keyof typeof AssigmentTypes]}
                >
                  {t.split("_").join(" ").toLocaleLowerCase()}
                </option>
              ))}
            </RHFSelect>
          </Stack>

          <RHFSelect native name="course" label="Select Course">
            <option key="empty" value="en"></option>
            <option key="course1" value="course1">
              Javascript Base
            </option>
            <option key="course2" value="course2">
              Javascript Advance
            </option>
          </RHFSelect>

          <RHFSelect native name="lesson" label="Select Lesson">
            <option key="empty" value="en"></option>
            <option key="lesson1" value="lesson1">
              Variables types
            </option>
            <option key="lesson2" value="lesson2">
              Loop
            </option>
          </RHFSelect>

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
    </>
  );
}
