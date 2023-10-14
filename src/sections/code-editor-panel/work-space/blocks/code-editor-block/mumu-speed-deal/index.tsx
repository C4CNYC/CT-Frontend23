import { type FC, useEffect, useRef, useState, useMemo } from "react";

import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SolutionMobileDialog from "@sections/code-editor-panel/top-bar/nav-bar/options/help-popup/options/solution-mobile-dialog";
import TipsMobileDialog from "@sections/code-editor-panel/top-bar/nav-bar/options/help-popup/options/tips-modal-dialog";
import UnstuckMobileDialog from "@sections/code-editor-panel/top-bar/nav-bar/options/help-popup/options/unstack-dialogs/UnstuckMobileDialog";

import TipsPopover from "../tips-popover";

import { useGetLessonStudentQuery } from "src/redux/services/manager/lesson-student";
import { useSelector } from "src/redux/store";
import { actions, actionsTips, IActionDialogType } from "./config";
import {
  getSpeedDealFabProps,
  getSpeedDealStyles,
  SPEED_DEAL_ACTION_FAB_PROPS,
  BOX_PROPS
} from './constants'

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

  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const { data, isLoading } = useGetLessonStudentQuery({ id: lessonId });
  const speedDealProps = useMemo(() => getSpeedDealFabProps(speedDeal), [speedDeal]);
  const speedDealStyles = useMemo(() => getSpeedDealStyles(isDesktop), [isDesktop]);

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

  const isTipsPopover = !isLoading && data?.tips.length

  return (
    <>
      {Boolean(isTipsPopover) && (
        <TipsPopover
          anchorEl={anchorEl}
          openPoper={openPoper}
          setOpenPoper={setOpenPoper}
          tips={data?.tips ?? []}
        />
      )}

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
            }}
            tooltipTitle={
              <Typography sx={{ color: action.color, p: "2px" }}>
                {action.name}
              </Typography>
            }
            FabProps={SPEED_DEAL_ACTION_FAB_PROPS}
          />
        ))}
      </SpeedDial>

      <TipsMobileDialog
        open={dialogType === IActionDialogType.tips}
        onClose={handleCloseDialog}
        isLoading={isLoading}
        tips={data?.tips}
      />

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
}

export default MumuSpeedDial;
