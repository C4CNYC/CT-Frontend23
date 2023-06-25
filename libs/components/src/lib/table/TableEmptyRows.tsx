// @mui
import { TableCell, TableRow } from "@mui/material";

// ----------------------------------------------------------------------

interface Props {
  height?: number;
  emptyRows: number;
}

export function TableEmptyRows({
  emptyRows,
  height,
}: Props): React.ReactElement | null {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
