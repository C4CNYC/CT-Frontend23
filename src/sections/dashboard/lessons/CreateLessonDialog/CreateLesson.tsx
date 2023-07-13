import { useRouter } from "next/router";
import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";

import { FormProvider, RHFSwitch, RHFTextField } from "@components";
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from "src/redux/services/manager/lessons-manager";
import { useAddLessonToModuleMutation } from "src/redux/services/manager/modules-manager";

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

export default function CreateLesson({
  id,
  isEdit,
  children,
  defaultValues,
}: Prop): React.ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
    setLoading(false);
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

                  <RHFSwitch name="active" label="Lesson active" />
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
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                  >
                    Save
                  </LoadingButton>
                </Box>
              </Card>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
