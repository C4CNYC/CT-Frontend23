// @mui
import {
  Box,
  FormControlLabel,
  Switch,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

import { useTranslate } from "src/utils/translateHelper";

//

// ----------------------------------------------------------------------

interface Props {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
}

export function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}: Props & TablePaginationProps): React.ReactElement | null {
  const translate = useTranslate();

  return (
    <Box sx={{ position: "relative", ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
      />

      {onChangeDense && (
        <FormControlLabel
          label={translate("dense")}
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: "absolute",
            },
          }}
        />
      )}
    </Box>
  );
}
