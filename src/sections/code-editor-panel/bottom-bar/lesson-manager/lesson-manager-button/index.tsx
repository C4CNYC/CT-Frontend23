import { type FC, useMemo } from "react";

import {
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import { Iconify } from "@components";
import { type BaseResponseInterface } from "@utils";
import { type ILesson } from "src/redux/interfaces/content.interface";

import { ICON_BTN_SX, TYP_SX, getButtonSx } from "./constants";

interface LessonManagerButtonProps {
  onOpen: () => void;
  lesson?: ILesson & BaseResponseInterface;
}

const LessonManagerButton: FC<LessonManagerButtonProps> = ({
  onOpen,
  lesson,
}) => {
  const theme = useTheme();
  const buttonSx = useMemo(() => getButtonSx(theme), [theme]);

  return (
    <Stack
      className="lessonsTour"
      direction="row"
      alignItems="center"
      onClick={onOpen}
    >
      <Tooltip title="LESSONS LIST" placement="top">
        <IconButton className="lessonsTourMobile" sx={ICON_BTN_SX}>
          <Iconify icon="iconoir:page" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={lesson?.name && lesson?.name.length > 24 ? lesson?.name : ""}
        placement="top"
      >
        <Button disableRipple disableFocusRipple sx={buttonSx}>
          <Typography variant="body2" noWrap sx={TYP_SX}>
            {lesson?.name}
          </Typography>
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default LessonManagerButton;
