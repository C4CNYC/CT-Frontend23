// @mui
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
} from "@mui/material";
// components
import Iconify from "@components/iconify";

// ----------------------------------------------------------------------

interface ToolbarProps {
  isText: boolean;
  isMulti: boolean;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMulti: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: VoidFunction;
}

export default function Toolbar({
  isText,
  isMulti,
  onChangeText,
  onChangeMulti,
  onRefresh,
  ...other
}: ToolbarProps): React.ReactElement | null {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...other}
    >
      <FormControlLabel
        control={<Switch checked={isText} onChange={onChangeText} />}
        label="Text Object"
      />

      <Box sx={{ flexGrow: 1 }} />

      {!isText && (
        <FormControlLabel
          control={<Switch checked={isMulti} onChange={onChangeMulti} />}
          label="Multi Item"
        />
      )}

      <IconButton onClick={onRefresh}>
        <Iconify icon="eva:refresh-fill" />
      </IconButton>
    </Paper>
  );
}
