import { type FC, useEffect, useMemo, useRef, useState } from "react";

import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SolutionMobileDialog from "@sections/code-editor-panel/top-bar/nav-bar/options/help-popup/options/solution-mobile-dialog";
import UnstuckMobileDialog from "@sections/code-editor-panel/top-bar/nav-bar/options/help-popup/options/unstack-dialogs/UnstuckMobileDialog";
import { useCodePanel } from "src/hooks/useCodePanel";
import { useGetLessonStudentQuery } from "src/redux/services/manager/lesson-student";
import { useSelector } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

import TipsPopover from "../tips-popover";
import { IActionDialogType, actions, actionsTips } from "./config";
import {
  BOX_PROPS,
  SPEED_DEAL_ACTION_FAB_PROPS,
  getSpeedDealFabProps,
  getSpeedDealStyles,
} from "./constants";

interface MumuSpeedDialProps {
  typing: boolean | null;
}

const MumuSpeedDial: FC<MumuSpeedDialProps> = ({ typing }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [actionsList, setActionsList] =
    useState<Array<Record<string, any>>>(actions);
  const popperRef = useRef<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openPoper, setOpenPoper] = useState<boolean>(false);
  const [speedDeal, setSpeedDial] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<IActionDialogType | null>(null);
  const translate = useTranslate();
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId);
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex);
  const {
    workSpaceProps: { data: workSpaceData },
  } = useCodePanel();
  const { data, isLoading } = useGetLessonStudentQuery({ id: lessonId });

  const slideTips = (workSpaceData[slideIndex]?.tips ?? "").split("\n");

  const speedDealProps = useMemo(
    () => getSpeedDealFabProps(speedDeal),
    [speedDeal]
  );
  const speedDealStyles = useMemo(
    () => getSpeedDealStyles(isDesktop),
    [isDesktop]
  );

  const openSpeedDial = () => {
    setSpeedDial(true);
  };
  const closeSpeedDial = () => {
    setSpeedDial(false);
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  useEffect(() => {
    setAnchorEl(popperRef.current);
  }, []);

  useEffect(() => {
    if (typing) {
      setOpenPoper(true);
    }
  }, [typing]);

  useEffect(() => {
    if (openPoper) {
      setActionsList(actionsTips);
      setSpeedDial(true);
    }
    if (!openPoper) {
      setActionsList(actions);
      setSpeedDial(false);
    }
  }, [openPoper]);

  const isTipsPopover = !isLoading && data?.tips.length;

  return (
    <>
      {Boolean(isTipsPopover) && (
        <TipsPopover
          anchorEl={anchorEl}
          openPoper={openPoper}
          setOpenPoper={setOpenPoper}
          tips={[...(data?.tips ?? []), ...slideTips]}
        />
      )}
      <Tooltip
        title={
          <Typography>{translate("code_editor_mumu_menu_tooltip")}</Typography>
        }
      >
        <SpeedDial
          ref={popperRef}
          aria-describedby={"popper"}
          ariaLabel="SpeedDial basic example"
          open={speedDeal}
          onClose={closeSpeedDial}
          onOpen={openSpeedDial}
          FabProps={speedDealProps}
          sx={speedDealStyles}
          direction="up"
          icon={<Box sx={BOX_PROPS} />}
        >
          {actionsList.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              onClick={() => {
                setDialogType(action.type);
                if (action.type === IActionDialogType.tips) {
                  setOpenPoper(true);
                }
              }}
              tooltipTitle={
                <Typography sx={{ color: action.color, p: "2px" }}>
                  {translate(action.name)}
                </Typography>
              }
              FabProps={SPEED_DEAL_ACTION_FAB_PROPS}
            />
          ))}
        </SpeedDial>
      </Tooltip>
      {/* commented before V1 release */}
      {/* <TipsMobileDialog
        open={dialogType === IActionDialogType.tips}
        onClose={handleCloseDialog}
        isLoading={isLoading}
        tips={[...(data?.tips ?? []), ...slideTips]}
      /> */}

      <SolutionMobileDialog
        open={dialogType === IActionDialogType.solution}
        onClose={handleCloseDialog}
      />

      <UnstuckMobileDialog
        open={dialogType === IActionDialogType.stuck}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default MumuSpeedDial;
