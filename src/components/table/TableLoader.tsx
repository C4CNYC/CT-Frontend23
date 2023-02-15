// @mui
import { TableRow, TableCell } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//
import EmptyContent from "../empty-content";
import { useLocales } from "../../locales";

// ----------------------------------------------------------------------

type Props = {
  isLoading: boolean;
};

export default function TableLoader({ isLoading }: Props) {
  if(!isLoading) return null;

  return (
    <TableRow>
        <TableCell colSpan={12}>
          <CircularProgress/>
        </TableCell>
    </TableRow>
  );
}
