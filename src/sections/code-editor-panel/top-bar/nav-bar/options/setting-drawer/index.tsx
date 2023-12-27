import { useState } from "react";

import { useDispatch } from "react-redux";

import { IconButton, SwipeableDrawer, Typography } from "@mui/material";
import { Box } from "@mui/system";

import {
  Iconify,
  resetLessonEvent,
  updateColorsEvent,
  updateFontSize,
  updateLineWrap,
} from "@components";
import { setSlideIndex } from "src/redux/slices/code-panel-global";
import { setStartTour } from "src/redux/slices/tour";
import { useTranslate } from "src/utils/translateHelper";

import EditColors from "./preferences/EditColors";
import EditorFontSize from "./preferences/EditorFontSize";
import EditorWordWrap from "./preferences/EditorWordWrap";
import IntroTour from "./preferences/IntroTour";
import ResetCode from "./preferences/ResetCode";

const SettingDrawer = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [openDrawer, setDrawer] = useState(false);
  const translate = useTranslate();

  const onStartIntro = (): void => {
    setDrawer(false);
    dispatch(setStartTour(true));
  };

  const onResetLesson = () => {
    dispatch(setSlideIndex(0));
    window.dispatchEvent(resetLessonEvent);
  };

  return (
    <Box sx={BOX_STYLES}>
      <IconButton
        onClick={() => {
          setDrawer(true);
        }}
      >
        <Iconify icon="ep:setting" />
      </IconButton>
      <SwipeableDrawer
        swipeAreaWidth={0}
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setDrawer(false);
        }}
        onOpen={() => {
          setDrawer(true);
        }}
      >
        <Box width="350px" p="30px 20px 40px 20px">
          <Box mb="30px" display="flex" alignItems="center">
            <Iconify mr="10px" width="35px" height="30px" icon="ep:setting" />

            <Typography variant="h5">{translate("settings")}</Typography>
          </Box>

          <Box display="grid" gap="30px">
            <ResetCode onReset={onResetLesson} />

            <IntroTour onStartIntro={onStartIntro} />

            <Typography variant="body1">
              {translate("coding_editor")}
            </Typography>

            <EditorFontSize
              onUpdateFontSize={(size: number) => {
                window.dispatchEvent(updateFontSize({ detail: { size } }));
              }}
            />

            <EditorWordWrap
              onUpdateWordWrap={(wrap: boolean) => {
                window.dispatchEvent(updateLineWrap({ detail: { wrap } }));
              }}
            />

            <Typography variant="body1">{translate("customize")}</Typography>

            <EditColors
              onUpdateColors={(data) => {
                window.dispatchEvent(updateColorsEvent(data));
              }}
            />
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

const BOX_STYLES = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
};

export default SettingDrawer;
