import { Theme } from "@mui/material";

export const HEADER_SX = {
  backgroundColor: "#60ced2",
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2,
  p: 1,
};
export const HEADER_TITLE_SX = {
  mt: "35px",
  ml: "32px",
  mb: "55px",
  color: "white",
  fontSize: "32px",
};
export const getSubtitleSx = (isLight: boolean) => ({
  fontSize: "16px",
  color: isLight ? "#4f4f4f" : "",
  mt: "12px",
  mb: "40px",
  textAlign: "center",
});
export const getCopySx = (isLight: boolean, theme: Theme) => ({
  backgroundColor: isLight ? "#f0f0f0" : theme.palette.background.neutral,
  width: "100%",
  height: "55px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "10px",
  px: 1,
});

export const COPY_BTN_SX = {
  background: "#f9f9f9",
  color: "#000",
  pointerEvents: "none",
  "&:hover": {
    background: "#bebebe",
  },
  width: "36px",
  height: "36px",
  m: "0px 8px",
  display: { xs: "none" },
};
export const LINK_TEXT_SX = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "180px",
};
export const COPY_BIG = {
  background: "#d1329e",
  "&:hover": {
    background: "#c31a8b",
  },
  width: "64px",
  height: "36px",
  m: "6px 12px",
};
export const RADIO_GROUP_SX = {
  fontSize: "24px",
  mb: "24px",
};
export const FORM_CONTROL_SX = {
  mb: "24px",
  mt: "10px",
};
export const RADIO_SX = {
  "&.Mui-checked": {
    color: "#d1329e",
  },
};
export const DIVIDER_SX = {
  mt: "10px",
  mb: "10px",
  background: "#E6F5FD",
  borderRightWidth: "4px",
  borderRadius: 2,
};
export const getSubtitleFooterSx = (isLight: boolean) => ({
  fontSize: "16px",
  m: "0px 0px 13px",
  color: isLight ? "#292929" : "",
});
export const CLASS_ROOM_BTN_SX = {
  background: "#f9f9f9",
  color: "#000",
  justifyContent: "space-between",
  borderRadius: "8px",
  mb: "16px",
  p: "18px",
  "&:hover": {
    background: "#bebebe",
  },
};
export const EMAIL_BTN_SX = {
  backgroundColor: "#f9f9f9",
  color: "#000",
  justifyContent: "space-between",
  borderRadius: "8px",
  p: "18px",
  "&:hover": {
    background: "#bebebe",
  },
};
