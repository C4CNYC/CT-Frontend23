import { useDropzone } from "react-dropzone";

import {
  Box,
  Button,
  IconButton,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { useTranslate } from "src/utils/translateHelper";

import { Iconify } from "../iconify";
import RejectionFiles from "./errors/RejectionFiles";
import { UploadIllustration } from "./illustrations";
import MultiFilePreview from "./preview/MultiFilePreview";
import { SingleFilePreview } from "./preview/SingleFilePreview";
import { UploadProps } from "./types";

// ----------------------------------------------------------------------

const StyledDropZone = styled("div")(({ theme }) => ({
  outline: "none",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  "&:hover": {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

export function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps): React.ReactElement | null {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;

  return (
    <Box sx={{ width: 1, position: "relative", ...sx }}>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(isError && {
            color: "error.main",
            bgcolor: "error.lighter",
            borderColor: "error.light",
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: "none",
          }),
          ...(hasFile && {
            padding: "12% 0",
          }),
        }}
      >
        <input {...getInputProps()} />

        <Placeholder
          sx={{
            ...(hasFile && {
              opacity: 0,
            }),
          }}
        />

        {hasFile && <SingleFilePreview file={file} />}
      </StyledDropZone>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: "absolute",
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      )}

      {hasFiles && (
        <>
          <Box sx={{ my: 3 }}>
            <MultiFilePreview
              files={files}
              thumbnail={thumbnail}
              onRemove={onRemove}
            />
          </Box>

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            {onRemoveAll && (
              <Button
                color="inherit"
                variant="outlined"
                size="small"
                onClick={onRemoveAll}
              >
                Remove all
              </Button>
            )}

            {onUpload && (
              <Button size="small" variant="contained" onClick={onUpload}>
                Upload files
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Placeholder({ sx, ...other }: StackProps): React.ReactElement | null {
  const translate = useTranslate();
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{
        width: 1,
        padding: 0,
        textAlign: {
          xs: "center",
          md: "left",
        },
        ...sx,
      }}
      {...other}
    >
      <UploadIllustration sx={{ width: 120 }} />

      <div>
        <Typography gutterBottom variant="h5">
          {translate("image_choose_image")}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {translate("image_drope_file")}
        </Typography>
      </div>
    </Stack>
  );
}
