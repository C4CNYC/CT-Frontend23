import { SxProps } from "@mui/system";

export const getBoxStyles = (isDesktop: boolean): SxProps => ({
  display: isDesktop ? "flex" : "none",
  width: "100%",
  background: "#fff",
  alignItems: "center",
  gap: 2,
  px: 1,
  py: 0.5,
  borderBottom: isDesktop ? "2px solid #5FD0D5" : "none",
  zIndex: 2,
  position: "relative",
});

export const TYP_SX = {
  color: "#D9D9E2",
  textTransform: "capitalize",
ml: 1
};

export const BUTTON_SX = {
  p: 0.2,
  minWidth: "0",
  ml: "auto",
  color: "#5FD0D5",
  "&:hover": {
    background: "none"
  }
};
