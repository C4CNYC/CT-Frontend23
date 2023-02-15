// @mui
import { TableRow, TableCell } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//
import EmptyContent from "../empty-content";
import { useLocales } from "../../locales";
import { Box } from "@mui/system";

// ----------------------------------------------------------------------

type Props = {
  isLoading: boolean;
};

export default function TableLoader({ isLoading }: Props) {
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
