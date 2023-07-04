import { FormProvider, RHFTextField } from "@ct-nx/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePostProjectMutation } from "src/redux/services/student/gallery-student";
import * as Yup from "yup";

interface IPublishModal {
  children: React.ReactElement;
  code: string;
  language: string;
  isPublic: boolean;
}

interface FormValuesProps {
  title: string;
  description: string;
  isPublic: boolean;
}

const PublishModal = ({
  children,
  code,
  language,
  isPublic,
}: IPublishModal): React.ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const [postProject, { isLoading }] = usePostProjectMutation();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const defaultValues = {
    title: "",
    description: "",
    public: isPublic,
  };

  const CreateProjectSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    public: Yup.boolean(),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateProjectSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await postProject({
        ...data,
        body: JSON.stringify({
          body: {
            code,
          },
        }),
        language,
      }).unwrap();
      enqueueSnackbar("Added successfully!");
      methods.reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {children}
      </Box>
      <Dialog
        maxWidth="sm"
        open={open}
        keepMounted
        onClose={handleClose}
        fullWidth
        sx={{
          zIndex: 1800,
        }}
      >
        <DialogTitle>{isPublic ? "PUBLISH" : "SAVE"}</DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Stack gap={3} p={1}>
              <RHFTextField name="title" label="Title" required />
              <RHFTextField
                multiline
                rows={5}
                name="description"
                label="Description"
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              CANCEL
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              SAVE
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default PublishModal;
