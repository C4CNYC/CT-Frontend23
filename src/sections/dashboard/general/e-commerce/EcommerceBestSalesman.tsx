// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardProps,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

// components
import { Image, Label, Scrollbar, TableHeadCustom } from "@components";
// utils
import { fCurrency } from "@utils";

// ----------------------------------------------------------------------

interface RowProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
  category: string;
  flag: string;
  total: number;
  rank: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function EcommerceBestSalesman({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <EcommerceBestSalesmanRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface EcommerceBestSalesmanRowProps {
  row: RowProps;
}

function EcommerceBestSalesmanRow({
  row,
}: EcommerceBestSalesmanRowProps): React.ReactElement | null {
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={row.name} src={row.avatar} />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2"> {row.name} </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {row.email}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>{row.category}</TableCell>

      <TableCell>
        <Image
          src={row.flag}
          alt="country flag"
          sx={{ maxWidth: 28, mx: "auto" }}
        />
      </TableCell>

      <TableCell>{fCurrency(row.total)}</TableCell>

      <TableCell align="right">
        <Label
          variant="soft"
          color={
            (row.rank === "Top 1" && "primary") ||
            (row.rank === "Top 2" && "info") ||
            (row.rank === "Top 3" && "success") ||
            (row.rank === "Top 4" && "warning") ||
            "error"
          }
        >
          {row.rank}
        </Label>
      </TableCell>
    </TableRow>
  );
}
