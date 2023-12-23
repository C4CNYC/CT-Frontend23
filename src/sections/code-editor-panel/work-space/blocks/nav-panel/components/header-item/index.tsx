import { type FC } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  Badge,
  IconButton,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

interface HeaderItemProps {
  onClick: () => void;
  activeUsers: number;
  isOpen: boolean;
  activeAdmins?: number;
}

const HeaderItem: FC<HeaderItemProps> = ({
  onClick,
  activeUsers,
  isOpen,
  activeAdmins = 0,
}) => {
  const translate = useTranslate();

  return (
    <ListItem sx={LIST_ITEM_SX}>
      <ListItemIcon>
        <IconButton onClick={onClick} sx={ARROW_SX}>
          {!isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </IconButton>
      </ListItemIcon>

      <Stack sx={STACK_SX}>
        <Typography sx={TITLE_SX}>{translate("quick_rabbits")}</Typography>

        <Stack direction="row">
          <Badge sx={BADGE_SX} badgeContent={""} color="success">
            <Typography sx={USER_SUBTITLE_SX}>
              {activeUsers} {translate("live")}
            </Typography>
          </Badge>

          <Badge sx={BADGE_SX} badgeContent={""} color="success">
            <Typography sx={SUBTITLE_SX}>
              {activeAdmins} {translate("admin")}
            </Typography>
          </Badge>
        </Stack>
      </Stack>
    </ListItem>
  );
};

const LIST_ITEM_SX = { height: 64 };

const ARROW_SX = {
  ml: "-3px",
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
