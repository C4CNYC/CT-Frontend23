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
import { useAddModuleToCourseMutation } from "src/redux/services/manager/courses-manager";
import * as Yup from "yup";
import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
} from "../../../redux/services/manager/modules-manager";

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

export default function CreateModuleDialog({
  id,
  isEdit,
  children,
  defaultValues,
}: Prop): React.ReactElement {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [addToCourse, { isLoading: isAddToCourseLoading }] =
    useAddModuleToCourseMutation();
  const [editModule, { isLoading: isEditLoading }] = useUpdateModuleMutation();
  const [createModule, { isLoading: isCreateLoading }] =
    useCreateModuleMutation();

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
        await editModule({
          id,
          ...data,
        });
      } else {
        const module = await createModule({
          ...data,
        }).unwrap();
        if (!query.course_id) return;
        await addToCourse({
          id: query.course_id as string,
          unit_id: module.id,
        }).unwrap();
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset();
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
    }
    handleClose();
  };

  return (
    <>
      <Box
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Create"} Module</DialogTitle>
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
                      label="Module name"
                      required
                    />

                    <RHFTextField
                      name="description"
                      label="Module description"
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
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={
                        isEditLoading || isCreateLoading || isAddToCourseLoading
                      }
                    >
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
