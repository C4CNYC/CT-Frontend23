import { useState } from "react";

import { sentenceCase } from "change-case";
import { format } from "date-fns";

// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// components
import {
  Iconify,
  Label,
  MenuPopover,
  Scrollbar,
  TableHeadCustom,
} from "@components";

// ----------------------------------------------------------------------

interface RowProps {
  id: string;
  name: string;
  avatar: string;
  checkIn: Date | string | number;
  checkOut: Date | string | number;
  phoneNumber: string;
  status: string;
  roomType: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableLabels: any;
  tableData: RowProps[];
}

export default function BookingDetails({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BookingDetailsRow key={row.id} row={row} />
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

interface BookingDetailsRowProps {
  row: RowProps;
}

function BookingDetailsRow({
  row,
}: BookingDetailsRowProps): React.ReactElement | null {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

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
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.name} src={row.avatar} />
            <Typography variant="subtitle2">{row.name}</Typography>
          </Stack>
        </TableCell>

        <TableCell>{format(new Date(row.checkIn), "dd MMM yyyy")}</TableCell>

        <TableCell>{format(new Date(row.checkOut), "dd MMM yyyy")}</TableCell>

        <TableCell>
          <Label
            variant={isLight ? "soft" : "filled"}
            color={
              (row.status === "paid" && "success") ||
              (row.status === "pending" && "warning") ||
              "error"
            }
          >
            {sentenceCase(row.status)}
          </Label>
        </TableCell>

        <TableCell>{row.phoneNumber}</TableCell>

        <TableCell sx={{ textTransform: "capitalize" }}>
          {row.roomType}
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
