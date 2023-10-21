import { type Theme, type FabProps, type SxProps } from "@mui/material";

export const BADGE_SX = { "& .MuiBadge-badge": { top: "-5px" } };

export const SPEED_DIAL_ACTION_FAB_PROPS: Partial<FabProps> = {
  sx: {
    background: "#364954",
  },
}

export const getSpeedDialFabProps = (isStepHasValidation: boolean): Partial<FabProps> => ({
  sx: {
    justifyContent: "ceter",
    color: "#D9D9D9",
    backgroundColor: !isStepHasValidation ? "#fff" : "#364954",
    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
    width: "50px",
    minHeight: "50px",
    "&:hover": {
      backgroundColor: !isStepHasValidation ? "#fff" : "#364954",
    },
  },
});

export const getSpeedDealSx = (theme: Theme): SxProps => ({
  display: "none",
  [theme.breakpoints.down(1000)]: {
    display: "flex",
    ml: "30%",
  },
  [theme.breakpoints.down(450)]: {
    ml: "23%",
  },
  "&  .MuiSpeedDial-actions": {
    flexDirection: "row",
    gap: 2,
    pl: 20,
  },
  background: "#fff",
  borderRadius: "50%",
  ml: "75px",
  width: "50px",
  height: "50px",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 500,
})
