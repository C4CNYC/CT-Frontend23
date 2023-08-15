import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { FormProvider, RHFSwitch, RHFTextField } from "@components";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import { useUpdateProjectMutation } from "src/redux/services/manager/gallery-student";

interface Props {
  children: React.ReactElement;
  title: string;
  description: string;
  publicProject: boolean;
  id: string;
}
interface FormValuesProps {
  name: string;
  description: string;
  public: boolean;
  language: string;
}

export default function EditProjectDialog({
  children,
  title,
  description,
  publicProject,
  id,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [updataeProject, { isLoading }] = useUpdateProjectMutation();
  const handleClickOpen = (): void => {
    setOpen(true);
  };
  const handleClickClose = (): void => {
    setOpen(false);
  };
  const defaultValues = {
    title,
    description,
    public: publicProject,
    language: "html",
  };
  const CreateProjectSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    public: Yup.bool(),
    language: Yup.string(),
  });
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateProjectSchema),
    defaultValues,
  });
  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updataeProject({
        id,
        ...data,
      }).unwrap();
      enqueueSnackbar("Updated successfully");
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
    handleClickClose();
  };
  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography variant="h6">Edit project</Typography>
          <IconButton onClick={handleClickClose} edge="end">
            <IoClose size="22px" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid item xs={12} md={12} p={2}>
              <Box rowGap={3} display="grid">
                <RHFTextField
                  sx={{ width: { xs: "300px", sm: "350px" } }}
                  name="title"
                  label="Project title"
                  required
                />

                <RHFTextField
                  name="description"
                  label="Project description"
                  required
                  multiline
                  rows={5}
                />

                <RHFSwitch name="public" label="Project publicity" />
              </Box>
            </Grid>
            <DialogActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Save
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
