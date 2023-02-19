import { useState } from "react";
import { format } from "date-fns";
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
import { FcFolder } from "react-icons/fc";
import { IClass } from "src/redux/services/interfaces/class.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import AddClassDialog from "../../schools/classes/CreateClassDialog";
import Link from "next/link";
import { PATH_DASHBOARD } from "src/routes/paths";

// ----------------------------------------------------------------------

type Props = {
  row: IClass & BaseResponseInterface;
  selected: boolean;
  onEditRow: (id: string, name: string) => void;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ClassesTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, active, total_students, createdAt } = row;

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
            <Avatar alt={name} children={<FcFolder />} />
          </Stack>
        </TableCell>

        <TableCell align="left">{name}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {total_students}
          </Label>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
          >
            0
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
        <AddClassDialog
          isEdit
          defaultValues={{ name: row.name }}
          updateClass={(name) => {
            onEditRow(row.id, name);
            handleClosePopover();
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </AddClassDialog>
        <MenuItem component={Link} href={PATH_DASHBOARD.school.setting(row.id)}>
          <Iconify icon="ant-design:setting-outlined" />
          Settings
        </MenuItem>
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
