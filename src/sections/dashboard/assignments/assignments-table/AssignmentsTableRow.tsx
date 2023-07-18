import { useState } from "react";

import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { ConfirmDialog, Iconify, Label, MenuPopover } from "@components";
import { Publish, Status } from "src/redux/enums/assignments.enum";
import { IAssignment } from "src/redux/interfaces/assignment.interface";

import { fDate } from "../../../../utils/formatTime";

type Props = {
  row: IAssignment;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function AssignmentsTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { name, description, type, start, dueDate, status, assigned, publish } =
    row;

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
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack direction="row" gap={0.5} alignItems="center">
            <Avatar
              src="/assets/assignment/coursePlaceholder.svg"
              alt=""
              sx={{ width: "24px", height: "24px" }}
            />
            <Typography variant="body1">{type}</Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (status === Status.open && "success") ||
              (status === Status.ending && "warning") ||
              (status === Status.overdue && "error") ||
              "default"
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="left">{fDate(start)}</TableCell>

        <TableCell align="left">{fDate(dueDate)}</TableCell>

        <TableCell align="center">{assigned}</TableCell>

        <TableCell align="center">
          <Label
            variant="soft"
            color={(publish === Publish.published && "info") || "default"}
          >
            {publish}
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
