import { SxProps, Theme } from "@mui/system";

export const TRIBE_LINK_SX = {
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  p: 0,
  justifyContent: "flex-start",
  position: "relative",
  borderRadius: 1,
  "&:hover": {
    backgroundColor: "rgba(145, 158, 171, 0.08)",
  },
};

export const getSignOfActiveLink = (
  theme: Theme,
  isActive: boolean
): SxProps => ({
  position: "absolute",
  top: "5px",
  left: "-12px",
  height: "30px",
  width: "4px",
  background: theme.palette.info.light,
  borderRadius: 2,
  zIndex: 10,
  display: isActive ? "block" : "none",
});

export const getTribeTitleSx = (theme: Theme): SxProps => ({
  ml: 2,
  color: theme.palette.text.secondary,
  fontSize: "18px",
});

export const getAddTribeButtonSx = (
  theme: Theme,
  isNavMini: boolean
): SxProps => ({
  alignSelf: "flex-start",
  borderRadius: 1,
  minWidth: "40px",
  p: 0,
  ml: isNavMini ? 0 : 2,
  minHeight: "40px",
  height: "40px",
  color: theme.palette.info.light,
  border: `2px solid ${theme.palette.info.light}`,
});
