import FormProvider, { RHFTextField } from "@components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Grid, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface FormValuesProps {
  name: string;
  description: string;
}

interface Prop {
  isEdit?: boolean;
  createClass?: (name: string) => void;
  updateClass?: (name: string) => void;
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  createClassLoading?: boolean;
}

export default function AddClassDialog({
  isEdit = false,
  createClass,
  updateClass,
  children,
  defaultValues,
  createClassLoading,
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Name is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const onSubmit = (data: FormValuesProps): void => {
    if (isEdit) {
      updateClass?.(data.name);
    } else {
      createClass?.(data.name);
    }
    methods.reset();
  };
  useEffect(() => {
    if (open && !createClassLoading) {
      handleClose();
    }
  }, [createClassLoading]);
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle>Add Class</DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: "14px" }}>
            <CloseIcon />
          </IconButton>
        </Box>
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
                      sx={{ width: "350px" }}
                      name="name"
                      label="Class name"
                      required
                    />
                    <RHFTextField
                      sx={{ width: "350px" }}
                      name="description"
                      label="Class description"
                      required
                      multiline
                      rows={3}
                    />
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
                      loading={createClassLoading}
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
