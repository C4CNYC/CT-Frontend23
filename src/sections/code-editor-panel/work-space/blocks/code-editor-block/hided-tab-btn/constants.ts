import { type SxProps } from "@mui/system";

const TAB_TITLES = {
  instructions: "Instructions",
  browser_preview: "Browser Preview",
};

export const HIDE_BUTTON_SX = {
  position: "absolute",
  top: 0,
  color: "#5FD0D5",
  minWidth: 20,
  "&:hover": {
    background: "none",
  },
};

export const COLLAPSEBAR_TITLE_SX = {
  textAlign: "center",
  minWidth: 150,
  transform: "rotate(270deg)",
  marginTop: "170px",
  color: "#A12E52",
  fontSize: "18px",
};

export const getCollapsebarSx = (
  isTabletAndMobile: boolean,
  title: string
): SxProps => ({
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  width: 30,
  height: isTabletAndMobile ? "calc(100vh - 80px)" : "calc(100vh - 105px)",
  overflow: "hidden",
  position: "relative",
  bgcolor:
    title === TAB_TITLES.instructions
      ? "rgba(161, 46, 82, 0.20)"
      : "rgba(173, 108, 26, 0.20)",
  // borderRadius: isTabletAndMobile ? "0 0 10px 10px" : 1,
  borderRadius:
    title === TAB_TITLES.instructions
      ? "0px 14px 14px 0px"
      : "14px 0px 0px 14px",
});
