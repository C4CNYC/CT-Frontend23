import { SxProps } from "@mui/system";

import { getLinearGradient } from "@utils";

export const JOIN_STACK_SX = {
  justifyContent: "space-between",
  alignItems: "center",
  mb: 5,
  pt: 1,
};

export const SHARE_TOKEN_BTN_SX = {
  gap: 0.5,
  color: "inherit",
  p: 0,
  textTransform: "none",
};

export const MAIN_CLASS_INFO_STACK_SX = {
  gap: "20px",
  justifyContent: "space-between",
  alignItems: {
    xs: "center",
    md: "end",
  },
  flexWrap: "wrap",
  pb: 2,
};

export const MEMBERS_LINK_SX = {
  display: "flex",
  alignItems: "center",
  color: "#fff",
  gap: 0.5,
};

export const SHARE_BUTTON_SX = {
  display: "flex",
  alignItems: "center",
  color: "#fff",
  ml: 2,
  "&:hover": {
    background: "none",
  },
};

export const POPOVER_EDIT_BTN_SX = {
  gap: 1,
  width: "100%",
  m: "0 auto",
  background: "#fff",
  color: "#75CF6D",
  "&:hover": {
    background: "#22A64733",
  },
};

export const CLASS_AVATAR_SX = {
  width: 60,
  height: 60,
  border: "2px solid #ED9526",
  background: "#FBDD3F",
  fontSize: "40px",
};

export const CLASS_INFO_WRAPPER = {
  flexWrap: "wrap",
  gap: 2,
  alignItems: "center",
};

export const CLASS_TITLE_SX = {
  color: "#fff",
  display: "flex",
  alignItems: "center",
};

export const TEACHER_EMOJI_SX = {
  width: "25px",
  height: "25px",
  mr: -1,
};

export const getClassInfoWrapperSx = (color: string): SxProps => ({
  background: getLinearGradient(color),
  color: "#fff",
  px: 4,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
});

export const NOTIFICATION_CONTAINER_SX = {
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: {
    xs: "center",
    md: "start",
  },
};

export const NOTIFICATION_WRAPPER_SX = {
  background: "#E6F5FD",
  color: "#364954",
  justifyContent: "space-between",
  alignItems: "center",
  px: 4,
  py: 0.5,
};

export const NOTIFICATION_LINK_SX = {
  display: "flex",
  alignItems: "center",
  color: "#364954",
  cursor: "pointer",
};

export const LINK_TEXT_SX = {
  ml: { xs: "28px", sm: 0.7 },
  mr: 1,
  textDecoration: "underline",
};
