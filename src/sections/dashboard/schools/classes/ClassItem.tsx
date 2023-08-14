import { useState } from "react";

import { useSnackbar } from "notistack";

import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
} from "@mui/material";

import { Iconify, MenuPopover } from "@components";
import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";
import { useUpdateClassMutation } from "src/redux/services/admin/school-amdin";
import { useUpdateClassesAvatarMutation } from "src/redux/services/manager/classes-manager";

import AddClassDialog from "./CreateClassDialog";

interface Props {
  classes: IClass & BaseResponseInterface;
  schoolId: string;
  handleEditClass?: (id: string) => void;
  handleDeleteClass: () => void;
}

export default function ClassItem({
  classes,
  handleDeleteClass,
  schoolId,
}: Props): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const [updateClass] = useUpdateClassMutation();
  const [updateClassAvatar] = useUpdateClassesAvatarMutation();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const updateClassByAdmin = async (
    name: string,
    description: string,
    cover: string,
    uploadedFile?: File
  ): Promise<void> => {
    try {
      await updateClass({
        schoolId,
        classId: classes.id,
        name,
        description,
        cover,
      }).unwrap();
      const file = new FormData();
      if (uploadedFile) {
        file.append("file", uploadedFile);
        await updateClassAvatar({
          schoolId,
          classId: classes.id,
          file,
        }).unwrap();
      }
      enqueueSnackbar(`Class ${name} updated successfuly!`);
    } catch (error: any) {
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
          <Avatar alt={classes.name} src={classes.avatar} />
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
            defaultValues={{
              name: classes.name,
              description: classes.description ?? "",
              cover: classes.cover ?? "",
            }}
            updateClass={(
              name: string,
              description: string,
              cover: string,
              uploadedFile?: File
            ) => {
              updateClassByAdmin(name, description, cover, uploadedFile);
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
