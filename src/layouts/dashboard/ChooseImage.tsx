import { Box, IconButton, Typography } from "@mui/material"
import { IoMdClose } from "react-icons/io"
import { RHFUpload, SingleFilePreview } from "@components"
import * as React from "react"
import { Dispatch, SetStateAction } from "react"

interface Props {
  uploadedFile: null | File;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
}

export default function ChooseImage({
  uploadedFile,
  setUploadedFile,
}: Props) {
  return (
    <Box sx={{ position: "relative" }}>
      {uploadedFile ? (
        <IconButton
          sx={{
            position: "absolute",
            right: "5px",
            top: "5px",
            zIndex: 10,
            width: "20px",
            height: "20px",
            p: 0,
          }}
          onClick={() => { setUploadedFile(null) }}
        >
          <IoMdClose size="20px" />
        </IconButton>
      ) : null}
      <RHFUpload
        name="course_img"
        onDrop={(files: File[]) => { setUploadedFile(files[0]) }}
        helperText={
          <Typography
            variant="caption"
            noWrap
            width="90px"
            sx={{
              mt: 1,
              mb: -1,
              mx: "auto",
              display: "block",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {uploadedFile?.name}
          </Typography>
        }
      />
      <SingleFilePreview
        file={
          uploadedFile ? URL.createObjectURL(uploadedFile) : null
        }
      />
    </Box>
  )
}
