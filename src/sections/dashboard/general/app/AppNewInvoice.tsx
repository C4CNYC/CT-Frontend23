import { useState } from "react";

import { sentenceCase } from "change-case";

// @mui
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Divider,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

// components
import {
  Iconify,
  Label,
  MenuPopover,
  Scrollbar,
  TableHeadCustom,
} from "@components";
// utils
import { fCurrency } from "@utils";

// ----------------------------------------------------------------------

interface RowProps {
  id: string;
  category: string;
  price: number;
  status: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function AppNewInvoice({
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
                <AppNewInvoiceRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface AppNewInvoiceRowProps {
  row: RowProps;
}

function AppNewInvoiceRow({
  row,
}: AppNewInvoiceRowProps): React.ReactElement | null {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleDownload = (): void => {
    handleClosePopover();
  };

  const handlePrint = (): void => {
    handleClosePopover();
  };

  const handleShare = (): void => {
    handleClosePopover();
  };

  const handleDelete = (): void => {
    handleClosePopover();
  };

  return (
    <>
      <TableRow>
        <TableCell>{`INV-${row.id}`}</TableCell>

        <TableCell>{row.category}</TableCell>

        <TableCell>{fCurrency(row.price)}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === "in_progress" && "warning") ||
              (row.status === "out_of_date" && "error") ||
              "success"
            }
          >
            {sentenceCase(row.status)}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="eva:printer-fill" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
