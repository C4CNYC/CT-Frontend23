import { useState } from "react";
import {
  Avatar,
  Button,
  Tooltip,
  ListItem,
  MenuItem,
  ListItemText,
  ListItemAvatar
} from "@mui/material";
import Iconify from "../../../components/iconify";
import MenuPopover from "../../../components/menu-popover";
import { IUser } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

// ----------------------------------------------------------------------

type Props = {
  person: IUser & BaseResponseInterface;
  handleDeleteTeacher: () => void;
};

export default function TeacherItem({
                                      person,
                                      handleDeleteTeacher
                                    }: Props) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar alt={person.first_name} src="/assets/images/avatar_2.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={`${person.first_name || ""} ${person.last_name || ""}`}
          secondary={
            <Tooltip title={person.email}>
              <span>{person.email}</span>
            </Tooltip>
          }
          primaryTypographyProps={{ noWrap: true, typography: "subtitle2" }}
          secondaryTypographyProps={{ noWrap: true }}
          sx={{ flexGrow: 1, pr: 1 }}
        />

        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:chevron-down-fill" />}
          onClick={handleOpenPopover}
          sx={{
            flexShrink: 0,
            textTransform: "unset",
            fontWeight: "fontWeightMedium",
            "& .MuiButton-endIcon": {
              ml: 0
            },
            ...(openPopover && {
              bgcolor: "action.selected"
            })
          }}
        ></Button>
      </ListItem>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 160 }}
      >
        <>
          <MenuItem
            onClick={() => {
              handleDeleteTeacher();
              handleClosePopover();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Remove
          </MenuItem>
        </>
      </MenuPopover>
    </>
  );
}
