import { useState } from "react";
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
} from "@mui/material";
import Label from "@components/label";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import ConfirmDialog from "@components/confirm-dialog";
import { IUser } from "src/redux/services/interfaces/user.interface";
import RoleSelector from "@components/drop-down-menu";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

// ----------------------------------------------------------------------

type Props = {
  row: IUser & BaseResponseInterface;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { first_name, last_name, email, verified, active, role, id } = row;
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
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
            <Avatar alt={first_name} src="/assets/images/avatar_2.jpg" />
          </Stack>
        </TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="left">
          {first_name &&
            first_name?.charAt(0).toUpperCase() + first_name?.slice(1)}
        </TableCell>

        <TableCell align="left">
          {last_name &&
            last_name?.charAt(0).toUpperCase() + last_name?.slice(1)}
        </TableCell>

        {role ? (
          <TableCell align="left" sx={{ textTransform: "capitalize" }}>
            <RoleSelector user_id={id} role={role} email={email} />
          </TableCell>
        ) : null}

        <TableCell align="center">
          <Iconify
            icon={verified ? "eva:checkmark-circle-fill" : "eva:clock-outline"}
            sx={{
              width: 20,
              height: 20,
              color: !verified ? "warning.main" : "success.main",
            }}
          />
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={active ? "success" : "warning"}
            sx={{ textTransform: "capitalize" }}
          >
            {active ? "active" : "not active"}
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
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
