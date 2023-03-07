import FormProvider, { RHFSwitch, RHFTextField } from "@components/hook-form";
import { useSnackbar } from "@components/snackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddLessonToModuleMutation } from "src/redux/services/manager/modules-manager";
import * as Yup from "yup";
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from "../../../redux/services/manager/lessons-manager";

interface FormValuesProps {
  name: string;
  description: string;
  active: boolean;
}

interface Prop {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id?: string;
}

export default function CreateLessonDialog({
  id,
  isEdit,
  children,
  defaultValues,
}: Prop): React.ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [editLesson] = useUpdateLessonMutation();
  const [createLesson] = useCreateLessonMutation();
  const [addLessonToModule] = useAddLessonToModuleMutation();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (isEdit && id) {
        await editLesson({
          id,
          ...data,
        }).unwrap();
      } else {
        const lesson = await createLesson({
          ...data,
        }).unwrap();
        if (router.query.module_id) {
          addLessonToModule({
            id: router.query.module_id as string,
            lesson_id: lesson.id,
          });
        }
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset();
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
      console.error(error, "test");
    }
    // eslint-disable-next-line no-eval
    handleClose();
  };

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Create"} Lesson</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} display="grid">
                    <RHFTextField
                      style={{ width: "350px" }}
                      name="name"
                      label="Lesson name"
                      required
                    />

                    <RHFTextField
                      name="description"
                      label="Lesson description"
                      required
                      multiline
                      rows={3}
                    />

                    <RHFSwitch name="active" label="Module active" />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 7,
                    }}
                  >
                    <Button onClick={handleClose}>Close</Button>
                    <LoadingButton type="submit" variant="contained">
                      Save
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
