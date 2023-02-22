import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Card, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFSwitch, RHFTextField } from "@components/hook-form";
import {
  useUpdateModuleMutation,
  useCreateModuleMutation,
} from "../../../redux/services/manager";
import { useSnackbar } from "@components/snackbar";

type FormValuesProps = {
  name: string;
  description: string;
  active: boolean;
};

type Prop = {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id?: string;
};

export default function CreateModuleDialog({
  id,
  isEdit,
  children,
  defaultValues,
}: Prop) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [editModule] = useUpdateModuleMutation();
  const [createModule] = useCreateModuleMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!isEdit) {
        await createModule({
          ...data,
        }).unwrap();
      } else {
        await editModule({
          id,
          ...data,
        });
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
      console.error(error, "test");
    }
    handleClose();
  };

  return (
    <>
      <Box onClick={() => handleClickOpen()}>{children}</Box>
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
