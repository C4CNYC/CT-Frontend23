import { useState } from "react";

import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";

import { ConfirmDialog, Iconify, MenuPopover } from "@components";
import { IStudent } from "src/redux/services/interfaces/user.interface";

interface Props {
  row: IStudent;
  selected: boolean;
  loading?: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
}

export default function MemberRow({
  row,
  selected,
  loading,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props): React.ReactElement | null {
  const {
    first_name: firstName,
    last_name: lastName,
    avatar,
    username,
    city,
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
          <Stack direction="row" alignItems="center">
            <Avatar alt={firstName} src={avatar} />
          </Stack>
        </TableCell>
        <TableCell align="left">
          {firstName &&
            firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}
        </TableCell>

        <TableCell align="left">
          {lastName && lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}
        </TableCell>

        <TableCell align="left">{username}</TableCell>
        <TableCell align="left">{city ?? "-"}</TableCell>

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
        sx={{ width: 140 }}
      >
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

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onDeleteRow}
            loading={loading}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
