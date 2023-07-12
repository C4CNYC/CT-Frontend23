import { useCallback, useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { MuiColorInput } from "mui-color-input";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FormProvider, RHFTextField, RHFUploadAvatar } from "@components";

interface FormValuesProps {
  name: string;
  description: string;
  cover: string;
  avatar?: File;
}

interface Prop {
  isEdit?: boolean;
  createClass?: (
    name: string,
    description: string,
    cover?: string,
    uploadedFile?: File
  ) => void;
  updateClass?: (
    name: string,
    description: string,
    cover: string,
    uploadedFile?: File
  ) => void;
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
      updateClass?.(data.name, data.description, data.cover, data.avatar);
    } else {
      createClass?.(data.name, data.description, data.cover, data.avatar);
    }
    handleClose();
    methods.reset();
  };
  useEffect(() => {
    if (open && !createClassLoading) {
      handleClose();
    }
  }, [createClassLoading]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        methods.setValue("avatar", newFile, { shouldValidate: false });
      }
    },
    [methods.setValue]
  );
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
            <Grid sx={{ px: 3, pb: 3 }}>
              <Grid sx={{ pb: 3 }}>
                <RHFUploadAvatar
                  name="avatar"
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      {isEdit
                        ? ""
                        : "Live empty and we will generate it randomly"}
                    </Typography>
                  }
                />
                <Controller
                  control={methods.control}
                  name="cover"
                  render={({ field, fieldState }) => (
                    <MuiColorInput
                      sx={{ width: "100%", mt: 3 }}
                      {...field}
                      value={field.value}
                      helperText={fieldState.invalid ? "Color is invalid" : ""}
                      error={fieldState.invalid}
                      isAlphaHidden
                      format="hex"
                      label="Cover"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box rowGap={3} display="grid">
                  <RHFTextField
                    sx={{ width: { xs: "280px", sm: "350px" } }}
                    name="name"
                    label="Class name"
                    required
                  />
                  <RHFTextField
                    sx={{ width: { xs: "280px", sm: "350px" } }}
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
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
