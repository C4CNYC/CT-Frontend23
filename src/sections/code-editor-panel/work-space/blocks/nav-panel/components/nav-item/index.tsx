import { type FC } from "react";

import {
  ListItem,
  ListItemText,
  Stack,
  Badge,
  ListItemAvatar,
  Avatar,
  IconButton,
  Tooltip
} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { IFriend } from "src/redux/interfaces/friends.interface";
import { BaseResponseInterface } from "@utils";

interface NavItemProps {
  onClick?: () => void
  onToggle: () => void
  data: IFriend & BaseResponseInterface
}

const MAX_NAME_LENGTH = 15;
const MAX_ABOUT_LENGTH = 28;

const NavItem: FC<NavItemProps> = ({
  onToggle,
  onClick,
  data
}) => {
  const name = `${data.first_name} ${data.last_name}`;
  const tooltipNameTitle = name.length > MAX_NAME_LENGTH ? name : "";
  const tooltipAbout = data.about?.length > MAX_ABOUT_LENGTH ? data.about : "";

  return (
    <ListItem>
      <Badge
        sx={BADGE_SX}
        badgeContent={data.active ? '' : null}
        color="secondary"
      >
        <ListItemAvatar onClick={onToggle}>

        <Avatar src={data.avatar} />
        </ListItemAvatar>
      </Badge>

      <Stack sx={STACK_TEXT_SX} direction="column">
        <Tooltip placement="top-start" title={tooltipNameTitle}>
          <ListItemText sx={NAME_SX} primary={name} />
        </Tooltip>
        
        <Tooltip placement="top-start" title={tooltipAbout}>
          <ListItemText sx={TOPIC_SX} primary={data.about} />
        </Tooltip>
      </Stack>

      <IconButton onClick={onClick} sx={LIST_ITEM_BUTTON_SX}>
        <AddRoundedIcon />
      </IconButton>
    </ListItem>
  )
}

const STACK_TEXT_SX = {
  width: "100%"
}

const NAME_SX = {
  "& span": {
    fontSize: "18px",
    color: "#364954",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px"
  }
}

const TOPIC_SX = {
  "& span": {
    color: "#616161",
    fontSize: "11px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px"
  }
}

const BADGE_SX = {
  '& .MuiBadge-badge': {
    right: "auto",
    top: 4,
    left: -12,
    width: 16,
    height: 16,
    minWidth: 16
  }
}

const LIST_ITEM_BUTTON_SX = {

}

export default NavItem;
