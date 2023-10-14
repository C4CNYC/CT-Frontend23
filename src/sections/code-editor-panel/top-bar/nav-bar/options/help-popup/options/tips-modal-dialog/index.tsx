import { type FC, useMemo } from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { EmptyContent, Iconify } from "@components";

import {
  DIALOG_PAPER_PROPS,
  DIALOG_TITLE_STYLES,
  ICON_BUTTON,
  TYPS_TYP_STYLES,
  getDialogContentStyles
} from "./constants";

interface TipsMobileDialogProps {
  open: boolean;
  onClose: () => void;
  tips?: string[];
  isLoading: boolean;
}

const TipsMobileDialog: FC<TipsMobileDialogProps> = ({
  open,
  onClose,
  tips,
  isLoading,
}) => {
  const theme = useTheme();
  const dialogContentStyles = useMemo(() => getDialogContentStyles(theme), [theme])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      PaperProps={DIALOG_PAPER_PROPS}
    >
      <DialogTitle sx={DIALOG_TITLE_STYLES}>
        <MdOutlineTipsAndUpdates size="30px" color="#FBDD3F" />

        <Typography
          variant="h5"
          sx={TYPS_TYP_STYLES}
        >
          Tips
        </Typography>

        <IconButton
          onClick={onClose}
          sx={ICON_BUTTON}
        >
          <Iconify width="20px" icon="ic:round-close" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={dialogContentStyles}>
        <Stack spacing={2}>
          {isLoading && (
            <Skeleton variant="rounded" width="100%" height="50px" />
          )}

          {tips?.length && !isLoading ? (
            tips.map((t, i) => (
              <Alert key={i} severity="info">
                {t}
              </Alert>
            ))
          ) : (
            <Box>
              <EmptyContent title="No data" />
            </Box>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default TipsMobileDialog;
