// @mui
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useTranslate } from "src/utils/translateHelper";

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  folderName?: string;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //
  open: boolean;
  onClose: VoidFunction;
}

export default function FileManagerNewFolderDialog({
  title = "Upload Files",
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  ...other
}: Props) {
  const translate = useTranslate();

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {" "}
        {title}{" "}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: "none" }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label={translate("folder_name")}
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}
      </DialogContent>

      <DialogActions>
        {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? translate("save") : translate("create")}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
}
