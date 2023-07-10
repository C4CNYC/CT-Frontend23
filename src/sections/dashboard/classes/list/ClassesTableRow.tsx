import { MenuPopover, Label, Iconify, ConfirmDialog, useSnackbar } from "@components";
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
import { useStudentJoinClassMutation } from "src/redux/services/manager/students-manager";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

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
  const { enqueueSnackbar } = useSnackbar();

  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const myStudentProfileId = useSelector((state: RootState) => state.global.user?.student_profile?.id);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [joinClass] = useStudentJoinClassMutation();

  const onJoinHandle = async () => {
    try {
      await joinClass({
        schoolId,
        classId: row.id,
        student_id: myStudentProfileId ?? ""
      }).unwrap();
      enqueueSnackbar("you joined to class")
    } catch (e) {
      enqueueSnackbar("you joined to class", { variant: "error" })
    }
  }

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.name} src={row.avatar} />
          </Stack>
        </TableCell>

        <TableCell align="left">{row.name}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {row.total_students}
          </Label>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {row.total_courses}
          </Label>
        </TableCell>

        <TableCell align="left">
          {format(new Date(row.createdAt), "MM/dd/yyyy")}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={row.active ? "success" : "warning"}
            sx={{ textTransform: "capitalize" }}
          >
            {row.active ? "active" : "not active"}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={
              (e: React.MouseEvent<HTMLElement>) => { setOpenPopover(e.currentTarget) }
            }
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={() => { setOpenPopover(null); }}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={onJoinHandle}>
          <Iconify icon="gala:add" />
          Join
        </MenuItem>
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
            setOpenConfirm(true);
            setOpenPopover(null);
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => { setOpenConfirm(false) }}
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
