// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

//
import { ConfirmDialogProps } from "./types";

// ----------------------------------------------------------------------

export function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps): React.ReactElement | null {
  const translate = useTranslate();

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {translate("actions_cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
