import React, { useEffect, useRef, useState } from "react";

import { useAtom } from "jotai";
import { AiOutlineCode } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import SolutionMobileDialog from "@sections/code-panel/top-bar/nav-bar/options/help-popup/options/SolutionMobileDialog";
import TipsMobileDialog from "@sections/code-panel/top-bar/nav-bar/options/help-popup/options/TIpsMobileDialog";
import UnstuckMobileDialog from "@sections/code-panel/top-bar/nav-bar/options/help-popup/options/UnstuckMobileDialog";
import { useGetLessonStudentQuery } from "src/redux/services/manager/lesson-student";

import TipsPopover from "./TipsPopover";

const enum IActionDialogType {
  tips = "Tips",
  solution = "Solution",
  stuck = "Stuck",
}

interface Props {
  typing: boolean | null;
}

export default function MumuSpeedDial({ typing }: Props): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [actionsList, setActionsList] =
    useState<Array<Record<string, any>>>(actions);
  const popperRef = useRef<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openPoper, setOpenPoper] = useState<boolean>(false);
  const [speedDeal, setSpeedDial] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<IActionDialogType | null>(null);

  const [{ lessonId }] = useAtom(globalCodePanelAtom);
  const { data, isLoading } = useGetLessonStudentQuery({ id: lessonId });

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

  return (
    <>
      {!isLoading && data?.tips.length ? (
        <TipsPopover
          anchorEl={anchorEl}
          openPoper={openPoper}
          setOpenPoper={setOpenPoper}
          tips={data.tips}
        />
      ) : null}

      <SpeedDial
        ref={popperRef}
        aria-describedby={"popper"}
        ariaLabel="SpeedDial basic example"
        open={speedDeal}
        onClose={closeSpeedDial}
        onOpen={openSpeedDial}
        FabProps={{
          sx: {
            opacity: !speedDeal ? 0.5 : 1,
            background: "#155275",
            boxShadow: "none",
            "&:hover": {
              opacity: 1,
              background: "#155275",
            },
          },
        }}
        sx={{
          position: "absolute",
          bottom: isDesktop ? 20 : 50,
          right: 8,
          "& .MuiSpeedDial-actions": {
            gap: 0,
          },
        }}
        direction="up"
        icon={
          <Box
            sx={{
              display: "flex",
              width: "60px",
              height: "60px",
              pl: "20px",
              background:
                "top 0 left -2px / cover no-repeat url(/assets/code-panel/mumu.png)",
              zIndex: "1051",
            }}
          />
        }
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
            FabProps={{
              sx: {
                opacity: 0.5,
                boxShadow: "none",
                background: "#155275",
                transition: "all .2s ease-in",
                "&:hover": {
                  opacity: 1,
                  background: "#155275",
                },
              },
            }}
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

const actions = [
  {
    icon: <MdOutlineTipsAndUpdates size="25px" color="#FBDD3F" />,
    name: "Tips",
    color: "#FBDD3F",
    type: IActionDialogType.tips,
  },
  {
    icon: <AiOutlineCode size="25px" color="#EE467A" />,
    name: "Solution",
    color: "#EE467A",
    type: IActionDialogType.solution,
  },
  {
    icon: <BsChatText size="20px" color="#43D4DD" />,
    name: "I`m stuck",
    color: "#43D4DD",
    type: IActionDialogType.stuck,
  },
];
const actionsTips = [
  {
    icon: <MdOutlineTipsAndUpdates size="25px" color="#FBDD3F" />,
    name: "Tips",
    color: "#FBDD3F",
    type: IActionDialogType.tips,
  },
];
