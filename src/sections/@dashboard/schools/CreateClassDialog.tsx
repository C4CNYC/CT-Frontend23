import * as React from "react";
import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Card, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useSnackbar } from "notistack";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import Iconify from "src/components/iconify";
import { useCreateClassMutation } from "src/redux/services/admin";

type FormValuesProps = {
  name: string;
};

type Prop = {
  school_id: string;
}

export default function AddClassDialog({ school_id }: Prop) {
  const org_id = useSelector(
    (state: RootState) => state.global.org_id
  );
  const [createSchool, { isLoading }] = useCreateClassMutation();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const defaultValues = {
    name: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createSchool({
        org_id: org_id,
        schoolId: school_id,
        ...data,
      }).unwrap;
      enqueueSnackbar(`School ${data.name} created successfuly!`);
      handleClose();
      methods.reset();
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <>
      <IconButton
              size="small"
              color="success"
              onClick={() =>  handleClickOpen()}
              sx={{
                p: 0,
                width: 24,
                height: 24,
                color: "common.white",
                bgcolor: "success.main",
                "&:hover": {
                  bgcolor: "success.main",
                },
              }}
            >
              <Iconify icon="eva:plus-fill" />
            </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Class</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} display="grid">
                    <RHFTextField name="name" label="Class name" required />
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
                      loading={isLoading}
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
