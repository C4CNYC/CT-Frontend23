import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  Avatar,
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

import { ConfirmDialog, Iconify, Label, MenuPopover } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { Status } from "src/redux/enums/assignments.enum";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";

import { fDate } from "../../../../utils/formatTime";
import AssignmentDrawer from "./AssignmentDrawer";

type Props = {
  row: IAssignment;
  selected: boolean;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function AssignmentsTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { query } = useRouter();
  const [openDetails, setOpenDetails] = useState(false);
  const { name, type, start_date, end_date, active, id } = row;
  const [status, setStatus] = useState(Status.open);
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

  const onOpenDetails = (): void => {
    setOpenDetails(true);
  };
  const onCloseDetails = (): void => {
    setOpenDetails(false);
  };

  const questPagePath = STUDENT_PATH_DASHBOARD.quest.id(id, {
    schoolId: query.schoolId as string,
  });

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

        <TableCell align="left">{fDate(start_date)}</TableCell>

        <TableCell align="left">{fDate(end_date)}</TableCell>

        <TableCell align="center">
          <Label variant="soft" color={(active && "info") || "default"}>
            {active ? "Published" : "Draft"}
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
        <Link
          component={NextLink}
          href={questPagePath}
          underline="none"
          color="initial"
        >
          <MenuItem
            onClick={() => {
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:eye-fill" />
            View
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            handleClosePopover();
            onOpenDetails();
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
      <AssignmentDrawer
        onCloseDetails={onCloseDetails}
        openDetails={openDetails}
        assignment={row}
      />
    </>
  );
}
