import { type SxProps } from "@mui/system";

export const getBaseStackSx = (isMobile: boolean): SxProps => ({
  width: isMobile ? "280px" : "350px"
});

export const STACK_SX = {
  bgcolor: "#ECF4FF",
  borderBottomLeftRadius: "18px",
  borderBottomRightRadius: "18px",
  alignItems: "center",
  justifyContent: "space-between",
}

export const LINK_SX = {
  gap: 1,
  color: "initial",
  display: "inline-flex",
  alignItems: "center",
  py: 1,
  pl: 2,
}

export const ICON_BTN_SX = { mr: 1 }
