import { useState } from "react";
// @mui
import {
  Avatar,
  Button,
  Tooltip,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

// components
import { IUser } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import _mock from "src/_mock";
import { useAddTeacherMutation } from "src/redux/services/admin";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

type Props = {
  schoolId: string;
  invited: boolean;
  person: IUser & BaseResponseInterface;
};

export default function UserItem({ person, schoolId, invited }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [addTeacher] = useAddTeacherMutation();

  const handleAddUser = async () => {
    try {
      await addTeacher({
        user_id: person.id,
        school_id: schoolId,
      }).unwrap();
    } catch (e) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  return (
    <>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar alt={person.first_name} src="/assets/images/avatar_2.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={`${person.first_name} ${person.last_name}`}
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
          disabled={invited}
          size="small"
          variant="outlined"
          onClick={handleAddUser}
        >
          {invited ? "Invited" : "Add"}
        </Button>
      </ListItem>
    </>
  );
}
