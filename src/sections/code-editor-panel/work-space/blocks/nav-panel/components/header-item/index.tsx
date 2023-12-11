import { type FC } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  Badge,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";

interface HeaderItemProps {
  onClick: () => void;
  activeUsers: number;
  activeAdmins?: number;
}

const HeaderItem: FC<HeaderItemProps> = ({
  onClick,
  activeUsers,
  activeAdmins = 0,
}) => {
  return (
    <ListItem sx={LIST_ITEM_SX}>
      <ListItemIcon onClick={onClick}>
        <ExpandLessIcon sx={ARROW_SX} />
      </ListItemIcon>

      <Stack sx={STACK_SX}>
        <Typography sx={TITLE_SX}>The Quick Rabbits</Typography>

        <Stack direction="row">
          <Badge sx={BADGE_SX} badgeContent={""} color="success">
            <Typography sx={USER_SUBTITLE_SX}>{activeUsers} live</Typography>
          </Badge>

          <Badge sx={BADGE_SX} badgeContent={""} color="success">
            <Typography sx={SUBTITLE_SX}>{activeAdmins} admin</Typography>
          </Badge>
        </Stack>
      </Stack>
    </ListItem>
  );
};

const LIST_ITEM_SX = { height: 64 };

const ARROW_SX = {
  marginLeft: "-10px",
  fontSize: "53px",
  color: "#C4C4C4",
};

const STACK_SX = {
  width: "100%",
  marginLeft: "-8px",
};

const TITLE_SX = {
  color: "#364954",
  fontSize: "21px",
  fontWeight: 700,
};

const SUBTITLE_SX = {
  fontSize: "11px",
  color: "#364954",
  paddingLeft: "12px",
};

const USER_SUBTITLE_SX = {
  ...SUBTITLE_SX,
  marginRight: "24px",
};

const BADGE_SX = {
  "& .MuiBadge-badge": {
    right: "auto",
    top: 8,
    width: 5,
    height: 5,
    minWidth: 5,
    padding: 0,
  },
};

export default HeaderItem;
