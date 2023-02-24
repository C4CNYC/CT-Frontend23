// @mui
import { IconButton, Paper } from "@mui/material";
// components
import Iconify from "@components/iconify";

// ----------------------------------------------------------------------

interface ToolbarProps {
  onRefresh: VoidFunction;
}

export default function Toolbar({
  onRefresh,
  ...other
}: ToolbarProps): React.ReactElement | null {
  return (
    <Paper
      sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
      {...other}
    >
      <IconButton onClick={onRefresh}>
        <Iconify icon="eva:refresh-fill" />
      </IconButton>
    </Paper>
  );
}
