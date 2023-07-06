// @mui
import { DialogProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface ConfirmDialogProps
  extends Omit<DialogProps, "title" | "content"> {
  title: React.ReactNode | null;
  content?: React.ReactNode | null;
  action: React.ReactNode | null;
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
}
