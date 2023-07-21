import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";

import { BaseResponseInterface } from "@utils";
import { IUser } from "src/redux/services/interfaces/user.interface";

// ----------------------------------------------------------------------

interface Props {
  invited: boolean;
  addHandler: () => void;
  person: IUser & BaseResponseInterface;
}

export default function UserItem({
  person,
  addHandler,
  invited,
}: Props): React.ReactElement | null {
  return (
    <>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar alt={person.first_name} src="/assets/images/avatar_2.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={`${person?.first_name} ${person?.last_name}`}
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
