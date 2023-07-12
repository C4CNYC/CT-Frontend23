// @mui
import { TableCell, TableRow } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//
import { Box } from "@mui/system";

// ----------------------------------------------------------------------

interface Props {
  isLoading: boolean;
}

export function TableLoader({ isLoading }: Props): React.ReactElement | null {
  if (!isLoading) return null;

  return (
    <TableRow>
      <TableCell colSpan={12}>
        <Box
          sx={{
            height: 160,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </TableCell>
    </TableRow>
  );
}
