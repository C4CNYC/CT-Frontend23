import { SxProps } from "@mui/system";

export const getHeaderWrapperSx = (
  isDesktop: boolean,
  isLeftBlock: boolean | undefined,
  isLeftBtn: boolean | undefined
): SxProps => ({
  display: isDesktop ? "flex" : "none",
  width: "100%",
  alignItems: "center",
  gap: 2,
  pr: isLeftBtn ? 1 : 4,
  py: 0.5,
  pl: isLeftBlock ? 1 : 5,
  borderBottom: isDesktop ? "2px solid #5FD0D5" : "none",
  zIndex: 2,
  position: "relative",
});

export const TYP_SX = {
  color: "#D9D9E2",
  textTransform: "capitalize",
  ml: 1,
};

export const BUTTON_SX = {
  ml: "auto",
  p: 0.2,
  minWidth: "0",
  color: "#5FD0D5",
  "&:hover": {
    background: "none",
  },
};
