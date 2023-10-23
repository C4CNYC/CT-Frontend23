import {
  type SxProps,
  type FabProps,
  type Theme
} from "@mui/material";

export const SPEED_DEAL_ACTION_FAB_PROPS = {
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
};

export const BOX_PROPS = {
  display: "flex",
  width: "60px",
  height: "60px",
  pl: "20px",
  background:
    "top 0 left -2px / cover no-repeat url(/assets/code-panel/mumu.png)",
  zIndex: "1051",
}

export const getSpeedDealFabProps = (isSpeedDeal: boolean): Partial<FabProps> => ({
  sx: {
    opacity: isSpeedDeal ? 1 : 0.5,
    background: "#155275",
    boxShadow: "none",
    "&:hover": {
      opacity: 1,
      background: "#155275",
    },
  }
});

export const getSpeedDealStyles = (isDesktop: boolean): SxProps<Theme> => ({
  position: "absolute",
  bottom: isDesktop ? 20 : 50,
  right: 8,
  "& .MuiSpeedDial-actions": {
    gap: 0,
  }
});
