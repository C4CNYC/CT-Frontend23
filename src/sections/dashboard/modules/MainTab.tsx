import { IoMdClose } from "react-icons/io";

import { Box, IconButton, Typography } from "@mui/material";

import {
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  SingleFilePreview,
} from "@components";

import { HELPER_IMG_TEXT, INPUT_SX, UPLOAD_IMG_BTN } from "./constants";

interface MainTabProps {
  uploadedFile: File | null;
  setUploadedFile: (file: null | File) => void;
}

const MainTab = ({
  setUploadedFile,
  uploadedFile,
}: MainTabProps): React.ReactElement => {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        {uploadedFile ? (
          <IconButton
            sx={UPLOAD_IMG_BTN}
            onClick={() => {
              setUploadedFile(null);
            }}
          >
            <IoMdClose size="20px" />
          </IconButton>
        ) : null}
        <RHFUpload
          name="module_img"
          onDrop={(files: File[]) => {
            setUploadedFile(files[0]);
          }}
          helperText={
            <Typography
              variant="caption"
              noWrap
              width="90px"
              sx={HELPER_IMG_TEXT}
            >
              {uploadedFile?.name}
            </Typography>
          }
        />
        <SingleFilePreview
          file={uploadedFile ? URL.createObjectURL(uploadedFile) : null}
        />
      </Box>
      <RHFTextField sx={INPUT_SX} name="name" label="Module name" required />

      <RHFTextField
        name="description"
        label="Module description"
        required
        multiline
        rows={3}
      />

      <RHFTextField name="tips" placeholder="Enter tip" label="Add tip" />

      <RHFSwitch name="active" label="Module active" />
    </>
  );
};

export default MainTab;
