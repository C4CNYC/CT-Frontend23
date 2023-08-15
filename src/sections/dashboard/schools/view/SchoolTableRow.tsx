import { useState } from "react";

import { BiDotsVerticalRounded } from "react-icons/bi";

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";

import { ConfirmDialog, Iconify, Label, MenuPopover } from "@components";
import { useLocales } from "src/locales";
import { ISchoolSummary } from "src/redux/services/interfaces/school.interface";

import SchoolDetailsDrawer from "../portal/SchoolDetailsDrawer";

interface Props {
  row: ISchoolSummary;
}

export default function SchoolTableRow({ row }: Props): React.ReactElement {
  const { translate } = useLocales();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleOpenDetails = (): void => {
    setOpenDetails(true);
  };

  const handleCloseDetails = (): void => {
    setOpenDetails(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
    event.stopPropagation();
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  return (
    <TableRow>
      <TableCell>
        {row.cover ? (
          <Avatar
            sx={{ width: "30px", height: "30px" }}
            alt={row.name as string}
            src={row.cover ?? "/assets/icons/shool/school-icon.svg"}
          ></Avatar>
        ) : (
          <Avatar
            variant="square"
            sx={{ width: "30px", height: "30px" }}
            alt={row.name as string}
            src={row.cover ?? "/assets/icons/shool/school-icon.svg"}
          ></Avatar>
        )}
      </TableCell>
      <TableCell padding="checkbox" align="left">
        {row.name}
      </TableCell>
      <TableCell align="center">{row.country}</TableCell>
      <TableCell align="left">{row.city}</TableCell>
      <TableCell align="left">{row.phone}</TableCell>
      <TableCell align="left">
        <Label
          variant="soft"
          color={row.active ? "success" : "warning"}
          sx={{ textTransform: "capitalize" }}
        >
          {row.active ? "active" : "not active"}
        </Label>
      </TableCell>
      <TableCell padding="checkbox" align="left">
        <IconButton onClick={handleOpenPopover}>
          <BiDotsVerticalRounded size={23} />
        </IconButton>
      </TableCell>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenDetails();
            handleClosePopover();
          }}
        >
          <>
            <Iconify icon="eva:edit-fill" />
            {translate("actions_edit")}
          </>
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
          {`${translate("actions_archive")}`}
        </MenuItem>
      </MenuPopover>

      <SchoolDetailsDrawer
        item={row}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={() => {
          handleCloseDetails();
        }}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={`${translate("actions_archive")}`}
        content={`${translate(
          "organizations.schools_page.archive_dialog.content"
        )}`}
        action={
          <Button variant="contained" color="error">
            {`${translate("actions_archive")}`}
          </Button>
        }
      />
    </TableRow>
  );
}
