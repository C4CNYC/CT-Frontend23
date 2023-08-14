import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

import { ConfirmDialog, Iconify, MenuPopover, useSnackbar } from "@components";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import { useUpdateClassPendingMutation } from "src/redux/services/manager/students-manager";

interface IMemberRowProps {
  row: IStudent;
  selected: boolean;
  loading?: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  pending: boolean;
}

export default function MemberRow({
  row,
  selected,
  loading,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  pending,
}: IMemberRowProps): React.ReactElement | null {
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    first_name: firstName,
    last_name: lastName,
    avatar,
    username,
    city,
  } = row;
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [approvePending, { isLoading }] = useUpdateClassPendingMutation();

  const handleApprovePending = async () => {
    try {
      await approvePending({
        classId: query.id as string,
        student_id: row.id as string,
      }).unwrap();
      enqueueSnackbar("Approved successfully");
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: "error" });
    }
  };

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

  useEffect(() => {
    if (!loading) {
      handleCloseConfirm();
    }
  }, [loading]);
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

        {!pending ? (
          <TableCell align="left">{city ?? "-"}</TableCell>
        ) : (
          <TableCell align="left">
            <LoadingButton
              onClick={handleApprovePending}
              loading={isLoading}
              variant="contained"
            >
              Approve
            </LoadingButton>
          </TableCell>
        )}

        <TableCell align="right">
          <RoleBasedGuard roles={[Role.Manager, Role.Admin, Role.Owner]}>
            <IconButton
              color={openPopover ? "inherit" : "default"}
              onClick={handleOpenPopover}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </RoleBasedGuard>
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
