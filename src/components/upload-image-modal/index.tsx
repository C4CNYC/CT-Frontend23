import * as React from "react";
import { useCallback } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { LoadingButton } from "@mui/lab";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";

import { fData } from "@utils";

import { useLocales } from "../../locales/useLocales";
import { FormProvider, RHFUploadAvatar } from "../hook-form";

interface FormValuesProps {
  cover: File;
}

export interface UploadImageProps {
  onUpload: (file: File, id: string | undefined) => Promise<void>;
  id?: string;
  color?: string;
}

export function UploadImageModal({
  onUpload,
  id,
  color,
}: UploadImageProps): React.ReactElement | null {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 2,
    borderRadius: "16px",
    p: 4,
    width: { xs: "90%", sm: "90%", md: "40%"},
  };
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const methods = useForm<FormValuesProps>();

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    if (!data.cover) {
      enqueueSnackbar("No image selected", { variant: "error" });
      return;
    }
    await onUpload(data.cover, id);
    reset();
    handleClose();
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("cover", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditOutlinedIcon style={{ color: color ?? "rgb(161, 167, 172)" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style}>
            <Stack
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              mb={3}
            >
              <Typography variant="h6" fontWeight="700">
                Upload Cover Image
              </Typography>
              <IconButton
                onClick={handleClose}
                sx={{ width: "35px" }}
                edge="end"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
            <RHFUploadAvatar
              name="cover"
              maxSize={20000000}
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
                    whiteSpace: "pre-line",
                  }}
                >
                  {`${translate(
                    "organizations.general_page.tabs.content.profile.upload_image",
                    {
                      formats: "png",
                      size: fData(2000000),
                    }
                  )}`}
                </Typography>
              }
            ></RHFUploadAvatar>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: "30px" }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Update
              </LoadingButton>
            </Stack>
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
}
