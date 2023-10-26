import { useMemo, type FC } from "react";

import {
  ListItemButton,
  ListItem,
  ListItemText,
  Stack,
  Badge,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { getRandomIndex } from "../../hook/utils";
import { ActivityStatus } from "../../../../../../../types/activity-status";
import { getActivityColor } from "../../../../../../../utils/activity-color";

interface NavItemProps {
  onClick?: () => void
  onToggle: () => void
  status?: ActivityStatus
  name: string
  topic: string
  id: string
}

const getAvatarLetters = (name: string) => {
  const [firstName, lastName] = name.split(" ")

  return `${(firstName[0] ?? "").toUpperCase()}${(lastName[0] ?? "").toUpperCase()}`
}

const COLORS = ["#155275", "rgba(120, 56, 121, 0.80)", "#EE467A"]

const NavItem: FC<NavItemProps> = ({
  onToggle,
  status,
  name,
  topic,
  onClick
}) => {
  const background = useMemo(() => COLORS[getRandomIndex(COLORS.length)] ?? COLORS[0], []);

  const activityColor = useMemo(() => {
    return getActivityColor(status);
  }, [status]);

  return (
    <ListItem>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        variant="dot"
        sx={{ "& .MuiBadge-badge": { bgcolor: activityColor } }}
      >
        <ListItemAvatar onClick={onToggle}>
          <Avatar sx={{ background, color: "white" }}>{getAvatarLetters(name)}</Avatar>
        </ListItemAvatar>
      </Badge>

      <ListItemButton onClick={onClick} sx={LIST_ITEM_BUTTON_SX}>
        <Stack sx={STACK_TEXT_SX} direction="column">
          <ListItemText sx={NAME_SX} primary={name} />
          <ListItemText sx={TOPIC_SX} primary={topic} />
        </Stack>

        <AddRoundedIcon />
      </ListItemButton>
    </ListItem>
  )
}

const STACK_TEXT_SX = {
  width: "100%"
}

const NAME_SX = {
  "& span": {
    fontSize: "18px",
    color: "#364954"
  }
}

const TOPIC_SX = {
  "& span": {
    color: "#616161",
    fontSize: "11px"
  }
}

const LIST_ITEM_BUTTON_SX = {
  paddingLeft: 0
}

export default NavItem;
