import {
  Avatar,
  Button,
  Tooltip,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { IUser } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

// ----------------------------------------------------------------------

type Props = {
  invited: boolean;
  addHandler: () => void;
  person: IUser & BaseResponseInterface;
};

export default function UserItem({ person, addHandler, invited }: Props) {
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
          onClick={addHandler}
        >
          {invited ? "Invited" : "Add"}
        </Button>
      </ListItem>
    </>
  );
}
