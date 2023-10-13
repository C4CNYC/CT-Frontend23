import { type FC } from 'react'
import NextLink from "next/link";
import { MdWifiTethering } from "react-icons/md";

import {
  Avatar,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useSelector } from "src/redux/store";

import {
  STACK_STYLES,
  AVATAR_STYLES,
  STACK_GROUP_STYLES,
  GROUP_TITLE_STYLES,
  TRIBE_NAME_STYLES, 
  TEACHING_STYLES
} from "./styles";

const MAX_TRIBE_NAME_LENGTH = 23

const GroupHeader: FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const tribe = useSelector((state) => state.codePanel.class);

  if (!isDesktop || !tribe) {
    return null;
  }

  const groupTitle =  tribe && tribe.name.length > MAX_TRIBE_NAME_LENGTH
    ? <Typography variant="subtitle2">{tribe.name}</Typography>
    : ''

  return (
    <Stack
      href={STUDENT_PATH_DASHBOARD.class.id(tribe.id)}
      component={NextLink}
      sx={STACK_STYLES}
      direction="row"
    >
      <Avatar
        alt="avatar"
        src={tribe?.avatar ?? ""}
        sx={AVATAR_STYLES}
      >
        🤖
      </Avatar>

      <Stack sx={STACK_GROUP_STYLES}>
        <Typography variant="caption" sx={GROUP_TITLE_STYLES}>
          Group
        </Typography>

        <Tooltip title={groupTitle}>
          <Typography variant="subtitle2" sx={TRIBE_NAME_STYLES}>
            {tribe?.name}
          </Typography>
        </Tooltip>
      </Stack>

      <MdWifiTethering
        size="20px"
        color="#A6A6A6"
        style={TEACHING_STYLES}
      />
    </Stack>
  );
}

export default GroupHeader
