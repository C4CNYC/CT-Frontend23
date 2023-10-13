import { type FabProps, type SxProps } from "@mui/material";

import { type Action } from "./config";

export const ACTION_FAB_PROPS: Partial<FabProps> = {
  size: "small",
  sx: {
    boxShadow: "none",
    background: "#155275",
    display: "flex",
    mb: "0px",
    "&:hover": {
      background: "#155275",
    },
  },
};

export const SPEED_DIAL_SX = {
  position: "absolute",
  bottom: "10px",
  right: 18,
  zIndex: 20,
  "& .MuiSpeedDial-actions": {
    gap: 0,
  },
};

export const BOX_SX = {
  position: "relative"
};

export const getChipSx = (action: Action): SxProps => ({
  position: "absolute",
  left: "-80px",
  top: "calc(50% - 10px)",
  zIndex: 1000,
  background: action.color,
  height: "20px",
  width: "68px",
  "& .MuiChip-label": {
    whiteSpace: "nowrap",
  },
});

export const getSpeedDialFabProps = (isSpeedDial: boolean): Partial<FabProps> => ({
  size: "small",
  sx: {
    background: isSpeedDial ? "#155275" : "white",
    boxShadow: "none",
    border: !isSpeedDial ? "2px solid #b3b3b3" : "none",
    "&:hover": {
      background: "#155275",
    },
  },
});
