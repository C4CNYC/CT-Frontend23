import { type SxProps } from "@mui/system";

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
  color: "#D9D9E2",
  fontSize: "18px",
};

export const getCollapsebarSx = (isTabletAndMobile: boolean): SxProps => ({
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  width: 30,
  height: isTabletAndMobile ? "calc(100vh - 80px)" : "calc(100vh - 105px)",
  border: isTabletAndMobile ? "none" : "3px solid rgb(234, 234, 235)",
  overflow: "hidden",
  position: "relative",
  borderRadius: isTabletAndMobile ? "0 0 10px 10px" : 1,
});
