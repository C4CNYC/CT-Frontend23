import { MenuPopover, Label, Iconify, ConfirmDialog } from "@components";
import {
  Avatar,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { IClass } from "src/redux/services/interfaces/class.interface";
import { BaseResponseInterface } from "@utils";
import ClassPreferences from "../modal";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";

// ----------------------------------------------------------------------

interface Props {
  row: IClass & BaseResponseInterface;
  selected: boolean;
  onEditRow: (
    id: string,
    name: string,
    description: string,
    cover: string,
    uploadedFile?: File
  ) => void;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  updateResult: boolean;
}

export default function ClassesTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  updateResult,
}: Props): React.ReactElement | null {
  const {
    name,
    active,
    total_students: totalStudents,
    total_courses: totalCourses,
    createdAt,
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
            <Avatar alt={name} src={row.avatar} />
          </Stack>
        </TableCell>

        <TableCell align="left">{name}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {totalStudents}
          </Label>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {totalCourses}
          </Label>
        </TableCell>

        <TableCell align="left">
          {format(new Date(createdAt), "MM/dd/yyyy")}
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
          component={Link}
          href={MANAGER_PATH_DASHBOARD.school.controller(row.id)}
        >
          <Iconify icon="material-symbols:connect-without-contact" />
          Connect
        </MenuItem>
        <ClassPreferences
          updateClass={(
            name: string,
            description: string,
            cover: string,
            uploadedFile?: File
          ) => {
            onEditRow(row.id, name, description, cover, uploadedFile);
          }}
          defaultValues={{
            name: row.name,
            description: row.description ?? "",
            cover: row.cover,
          }}
          rowId={row.id}
          updateResult={updateResult}
        >
          <MenuItem>
            <Iconify icon="ant-design:setting-outlined" />
            Settings
          </MenuItem>
        </ClassPreferences>
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
