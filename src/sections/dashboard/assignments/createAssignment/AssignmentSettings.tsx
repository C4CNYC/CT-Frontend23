import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from "@components/hook-form";
import {
  useCreateAssignmentMutation,
  useUdpateAssignmentMutation,
} from "../../../../redux/services/manager";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { AssignmentTypes } from "src/redux/services/enums/assignment-types.enum";
import { AssignmentStatuses } from "src/redux/services/enums/assignment-status.enum";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type AssignmentStepProps = {
  next: () => void;
  school_id: string;
  assignment?: IAssignment & BaseResponseInterface;
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
  assignment,
  next,
  getAssignmentId,
  school_id,
}: AssignmentStepProps) {
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();
  const [updateAssignment] = useUdpateAssignmentMutation();
  const board = useSelector((state: RootState) => state?.assignment?.board);
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: assignment?.name,
    description: assignment?.description,
    type: assignment?.type,
    course: "",
    lesson: "",
  };

  const createAssignmentSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Please select a tag"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(createAssignmentSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const backlogCol = board?.columns[AssignmentStatuses.BACKLOG];
    const idCardWithMinOrder = backlogCol?.cardIds[0];

    try {
      if (assignment) {
        await updateAssignment({
          assignment_id: assignment.id,
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
              {Object.keys(AssignmentTypes).map((t) => (
                <option
                  key={AssignmentTypes[t as keyof typeof AssignmentTypes]}
                  value={AssignmentTypes[t as keyof typeof AssignmentTypes]}
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
