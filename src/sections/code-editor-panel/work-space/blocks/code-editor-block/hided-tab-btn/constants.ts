import { type SxProps } from "@mui/system";

import { TAB_TITLES } from "@sections/code-editor-panel/work-space";

export const COLLAPSEBAR_TITLE_SX = {
  position: "absolute",
  top: "140px",
  textAlign: "start",
  minWidth: 190,
  transform: "rotate(90deg)",
  fontSize: "18px",
};

export const getCollapsebarSx = (
  isTabletAndMobile: boolean,
  title: string
): SxProps => ({
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  pt: "20px",
  width: 30,
  height: isTabletAndMobile ? "calc(100vh - 80px)" : "calc(100vh - 105px)",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  color: title === TAB_TITLES.instructions ? "#A12E52" : "#AD6C1A",
  bgcolor:
    title === TAB_TITLES.instructions
      ? "rgba(161, 46, 82, 0.20)"
      : "rgba(173, 108, 26, 0.20)",
  borderRadius:
    title === TAB_TITLES.instructions
      ? "0px 14px 14px 0px"
      : "14px 0px 0px 14px",
});
