import { useState } from "react";
import {
  Avatar,
  Button,
  ListItem,
  MenuItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import { IClass } from "src/redux/services/interfaces/class.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import AddClassDialog from "./CreateClassDialog";
import { useSnackbar } from "notistack";
import { useUpdateClassMutation } from "src/redux/services/admin";

// ----------------------------------------------------------------------

type Props = {
  classes: IClass & BaseResponseInterface;
  schoolId: string;
  handleEditClass?: (id: string) => void;
  handleDeleteClass: () => void;
};

export default function ClassItem({
  classes,
  handleDeleteClass,
  schoolId,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateClass] = useUpdateClassMutation();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const updateClassByAdmin = async (name: string) => {
    try {
      const data = await updateClass({
        schoolId,
        class_id: classes.id,
        name,
      }).unwrap();
      enqueueSnackbar(`School ${data.name} created successfuly!`);
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{ borderBottom: "solid 1px rgba(145, 158, 171, 0.24)" }}
      >
        <ListItemAvatar>
          <Avatar alt={classes.name} src="/assets/images/classes.png" />
        </ListItemAvatar>

        <ListItemText
          primary={classes.name}
          primaryTypographyProps={{ noWrap: true, typography: "subtitle2" }}
          secondaryTypographyProps={{ noWrap: true }}
          sx={{ flexGrow: 1, pr: 1 }}
        />

        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:more-vertical-fill" />}
          onClick={handleOpenPopover}
          sx={{
            flexShrink: 0,
            textTransform: "unset",
            fontWeight: "fontWeightMedium",
            "& .MuiButton-endIcon": {
              ml: 0,
            },
            ...(openPopover && {
              bgcolor: "action.selected",
            }),
          }}
        ></Button>
      </ListItem>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 160 }}
      >
        <>
          <AddClassDialog
            isEdit
            defaultValues={{ name: classes.name }}
            updateClass={() => {
              updateClassByAdmin;
              handleClosePopover();
            }}
          >
            <MenuItem>
              <Iconify icon="eva:edit-fill" />
              Edit
            </MenuItem>
          </AddClassDialog>
          <MenuItem
            onClick={() => {
              handleDeleteClass();
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
