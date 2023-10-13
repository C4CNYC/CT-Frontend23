import { type SxProps } from "@mui/system";

export const HEADER_HEIGHT = 64;
export const DIVIDER_HEIGHT = 3;
export const BOTTOM_LIST_HEIGHT = 176;

export const getStackCodeBoxSx = (height?: number | null) => ({
  position: "fixed",
  height: height == null ? "100%" : height,
  width: "max-content",
  top: 50,
  right: 300,
  display: "flex",
  flexWrap: "wrap-reverse",
  gap: "12px"
})

export const ICON_SX = {
  width: "30px",
  height: "30px",
  color: "#616161"
}

export const DIVIDER_SX = {
  padding: "0 16px",
  borderColor: "#F0F2F7",
  height: "3px",
  width: "calc(100% - 32px)",
  margin: "0 auto"
}

export const LIST_SX = {
  paddingTop: "0px"
}

export const MAIN_LIST = {
  paddingTop: "0px",
  height: "auto"
}

export const STACK_SX = {
  padding: 0,
  width: "100%",
  overflowY: "auto",
  maxHeight: `calc(100% - ${HEADER_HEIGHT}px - ${DIVIDER_HEIGHT * 2}px - ${BOTTOM_LIST_HEIGHT}px)`
}

export const getDrawerSx = (isOpen: boolean): SxProps => ({
  width: 60,
  minHeight: "100%",
  position: "relative",
  '& .MuiDrawer-paper': {
    transition: 'right .5s',
    width: 280,
    boxSizing: "border-box",
    maxHeight: "100%",
    position: "absolute",
    minHeight: "100%",
    right: isOpen ? 0 : -220,
    left: "auto",
    background: "#DFEEF7",
    boxShadow: "-2px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    borderRadius: "25px 0px 0px 25px",
    paddingTop: "12px",
    overflow: "visible",
  }
});
