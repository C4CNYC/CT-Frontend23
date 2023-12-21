import Link from "next/link";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useSelector } from "react-redux";

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

import {
  ConfirmDialog,
  Iconify,
  Label,
  MenuPopover,
  useSnackbar,
} from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";
import { useStudentJoinClassMutation } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

import ClassPreferences from "../modal";

interface IClassesTableRowProps {
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
  isDeleting: boolean;
}

export default function ClassesTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  updateResult,
  isDeleting,
}: IClassesTableRowProps): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();

  const myStudentProfileId = useSelector(
    (state: RootState) => state.global.user?.student_profile?.id
  );

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [joinClass] = useStudentJoinClassMutation();

  const onJoinHandle = async () => {
    try {
      await joinClass({
        classId: row.id,
        student_id: myStudentProfileId ?? "",
      }).unwrap();
      enqueueSnackbar(translate("classes_msg_joined_to_class"));
    } catch (e) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  useEffect(() => {
    if (!isDeleting && openConfirm) {
      setOpenConfirm(false);
    }
  }, [isDeleting]);

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
            {row.active ? translate("active") : translate("not_active")}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              setOpenPopover(e.currentTarget);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={() => {
          setOpenPopover(null);
        }}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={onJoinHandle}>
          <Iconify icon="gala:add" />
          {translate("actions_join")}
        </MenuItem>
        <MenuItem
          component={Link}
          href={MANAGER_PATH_DASHBOARD.school.controller(row.id)}
        >
          <Iconify icon="material-symbols:connect-without-contact" />
          {translate("actions_connect")}
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
            cover: row.cover ?? "",
          }}
          rowId={row.id}
          updateResult={updateResult}
        >
          <MenuItem>
            <Iconify icon="ant-design:setting-outlined" />
            {translate("settings")}
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
          {translate("actions_delete")}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        title={translate("actions_delete")}
        content={translate("messages_delete_question")}
        action={
          <LoadingButton
            loading={isDeleting}
            variant="contained"
            color="error"
            onClick={onDeleteRow}
          >
            {translate("actions_delete")}
          </LoadingButton>
        }
      />
    </>
  );
}
