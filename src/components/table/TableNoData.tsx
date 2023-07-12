import { 
  TableRow,
  TableCell, 
} from "@mui/material";

import { EmptyContent } from "../empty-content";
import { useLocales } from "../../locales/useLocales";

interface Props {
  isNotFound: boolean;
}

export function TableNoData({
  isNotFound,
}: Props): React.ReactElement | null {
  const { translate } = useLocales();

  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title={`${translate("messages_no_data")}`}
            sx={{
              "& span.MuiBox-root": { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
