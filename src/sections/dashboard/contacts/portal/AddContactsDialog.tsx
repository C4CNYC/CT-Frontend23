import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "@components/hook-form";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { countries } from "../../../../assets/data";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "@components/snackbar";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";

type FormValuesProps = {
  name: string;
  phoneNumber: string | null;
  email: string | null;
};

export default function AddContactsDialog() {
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
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const defaultValues = {
    name: "",
    phoneNumber: "",
    email: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Update success!");
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add contacts
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} display="grid">
                    <RHFTextField name="name" label="Name" required />
                    <RHFTextField name="phone" label="Phone" required />
                    <RHFTextField name="email" label="Email" required />
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
                      loading={isSubmitting}
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
