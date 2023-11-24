import { SxProps } from "@mui/system";

export const getBoxStyles = (isTabletAndMobile: boolean): SxProps => ({
  height: isTabletAndMobile ? "calc(100vh - 80px)" : "calc(100vh - 105px)",
  border: isTabletAndMobile ? "none" : "3px solid rgb(234, 234, 235)",
  overflow: "hidden",
  position: "relative",
  borderRadius: isTabletAndMobile ? "0 0 20px 20px" : 2,
});

export const getButtonSx = (isDesktop: boolean): SxProps => ({
  display: isDesktop ? "flex" : "none",
  width: 30,
  height: 30,
  p: 0.2,
  minWidth: "0",
  color: "#5FD0D5",
  zIndex: 20,
  "&:hover": {
    background: "none",
  },
});

export const getButtonWrapperSx = (isDesktop: boolean): SxProps => ({
  display: isDesktop ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
  ml: 3,
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 10,
  background: "rgba(238, 70, 122, 0.20)",
  width: 32,
  height: 32,
  borderBottomLeftRadius: "50%",
  borderBottom: "3px solid rgb(234, 234, 235)",
  borderLeft: "3px solid rgb(234, 234, 235)",
});
