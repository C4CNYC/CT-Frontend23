import { useState } from "react";
// @mui
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
// utils
import { fCurrency } from "../../../../utils/formatNumber";
import { fDate } from "../../../../utils/formatTime";
// @types
import { IInvoice } from "../../../../@types/invoice";
// components
import ConfirmDialog from "@components/confirm-dialog";
import { CustomAvatar } from "@components/custom-avatar";
import Iconify from "@components/iconify";
import Label from "@components/label";
import MenuPopover from "@components/menu-popover";

// ----------------------------------------------------------------------

interface Props {
  row: IInvoice;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
}

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props): React.ReactElement | null {
  const {
    sent,
    invoiceNumber,
    createDate,
    dueDate,
    status,
    invoiceTo,
    totalPrice,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={invoiceTo.name} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {invoiceTo.name}
              </Typography>

              <Link
                noWrap
                variant="body2"
                onClick={onViewRow}
                sx={{ color: "text.disabled", cursor: "pointer" }}
              >
                {`INV-${invoiceNumber}`}
              </Link>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{fDate(createDate)}</TableCell>

        <TableCell align="left">{fDate(dueDate)}</TableCell>

        <TableCell align="center">{fCurrency(totalPrice)}</TableCell>

        <TableCell align="center" sx={{ textTransform: "capitalize" }}>
          {sent}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (status === "paid" && "success") ||
              (status === "unpaid" && "warning") ||
              (status === "overdue" && "error") ||
              "default"
            }
          >
            {status}
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
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
