// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  folderPath: string
  onChangeFolderPath?: (event: SelectChangeEvent) => void;
  actualPath: string
  path: string
  paths: string[]
  //
  open: boolean;
  onClose: VoidFunction;
}

export default function FileManagerMoveFolderDialog({
  title = 'Move To',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderPath,
  onChangeFolderPath,
  actualPath,
  path,
  paths,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Select
          value={folderPath}
          onChange={onChangeFolderPath}
          input={<OutlinedInput label="Folder" />}
          sx={{ width: '100%' }}
        >
          {
            ['/', ...paths]
              .filter(p => p !== path)
              .filter(p => p !== (actualPath ? actualPath + '/' : '/'))
              .map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))
          }
        </Select>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
          <Button variant="soft" onClick={onCreate || onUpdate}>
            Move
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
