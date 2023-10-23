import { type FC } from 'react'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import {
  Avatar,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PersonIcon from '@assets/icons/PersonIcon';
import CustomSwitch from "./custom-switch";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useSelector } from "src/redux/store";

import { toggleCodePreview } from "src/redux/slices/code-panel-global";

import {
  STACK_STYLES,
  AVATAR_STYLES,
  STACK_GROUP_STYLES,
  GROUP_TITLE_STYLES,
  TRIBE_NAME_STYLES, 
} from "./styles";

const MAX_TRIBE_NAME_LENGTH = 23;

const GroupHeader: FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const tribe = useSelector((state) => state.codePanel.class);
  const dispatch = useDispatch()
  const isCodePreviewVisible = useSelector((state) => state.codePanelGlobal.isCodePreviewVisible)
  const { push } = useRouter()

  if (!isDesktop) {
    return null;
  }

  const onChange= () => {
    dispatch(toggleCodePreview(!isCodePreviewVisible))
  }

  const groupTitle =  tribe && tribe.name.length > MAX_TRIBE_NAME_LENGTH
  ? <Typography variant="subtitle2">{tribe.name}</Typography>
  : '';

  return (
    <Stack
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
          GROUP
        </Typography>

        <Tooltip title={groupTitle}>
          <Typography variant="subtitle2" sx={TRIBE_NAME_STYLES}>
            {tribe?.name}
          </Typography>
        </Tooltip>
      </Stack>

      <PersonIcon
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => {
          push(STUDENT_PATH_DASHBOARD.class.id(tribe?.id ?? ''))
        }}
      />

      <CustomSwitch
        isActive={isCodePreviewVisible}
        onChange={onChange}
      />
    </Stack>
  );
}

export default GroupHeader
