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
import { Status } from "src/redux/enums/assignments.enum";
import { IAssignmentFull } from "src/redux/interfaces/assignment.interface";
import { useTranslate } from "src/utils/translateHelper";

import { fDate } from "../../../utils/formatTime";
import AssignmentDrawer from "./AssignmentDrawer";

interface Props {
  row: IAssignmentFull;
  selected: boolean;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
}

export default function AssignmentsTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, type, start_date, end_date, active } = row;

  const translate = useTranslate();
  const [status] = useState(Status.open);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenDetails = (): void => {
    setOpenDetails(true);
  };
  const handleCloseDetails = (): void => {
    setOpenDetails(false);
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

        {/* <TableCell align="center">{assigned}</TableCell> */}

        <TableCell align="center">
          <Label variant="soft" color={(active && "info") || "default"}>
            {active ? translate("published") : translate("draft")}
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
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          {translate("actions_view")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenDetails();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {translate("actions_edit")}
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
          {translate("actions_delete")}
        </MenuItem>
      </MenuPopover>

      <AssignmentDrawer
        assignment={row}
        onCloseDetails={handleCloseDetails}
        openDetails={openDetails}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("actions_delete")}
        content={translate("messages_delete_question")}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {translate("actions_delete")}
          </Button>
        }
      />
    </>
  );
}
