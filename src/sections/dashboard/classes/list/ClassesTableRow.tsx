import ConfirmDialog from "@components/confirm-dialog";
import Iconify from "@components/iconify";
import Label from "@components/label";
import MenuPopover from "@components/menu-popover";
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
import { FcFolder } from "react-icons/fc";
import { IClass } from "src/redux/services/interfaces/class.interface";
import { PATH_DASHBOARD } from "src/routes/paths";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import AddClassDialog from "../../schools/classes/CreateClassDialog";

// ----------------------------------------------------------------------

interface Props {
  row: IClass & BaseResponseInterface;
  selected: boolean;
  onEditRow: (id: string, name: string) => void;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
}

export default function ClassesTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props): React.ReactElement | null {
  const { name, active, total_students, createdAt } = row;

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
            <Avatar alt={name}>
              <FcFolder />
            </Avatar>
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
