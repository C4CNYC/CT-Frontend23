import { type SxProps, type Theme } from "@mui/system";

export const CHECKERS_ANIMATION = {
  open: {
    width: "auto",
    opacity: 1,
  },
  closed: {
    width: "0px",
  },
};

export const OPEN_HANDLER_ANIMATION = {
  open: {
    opacity: 1,
    transition: { delay: 0.3 },
  },
  closed: {
    opacity: 0,
  },
};

export const getStackSx = (isBrowserHidden: boolean): SxProps<Theme> => ({
  top: "130px",
  right: 0,
  position: "absolute",
  zIndex: 300,
  flexDirection: "row",
});

export const BOX_SX = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 25,
  height: 30,
  borderRadius: "15px 0px 0px 15px",
  zIndex: 301,
  background: "rgba(21, 82, 117, 0.80)",
  ":hover": {
    cursor: "pointer",
  },
};

export const ICONIFY_SX = {
  "& path": {
    fill: "#000000",
  },
};

export const M_DIV_STYLE = {
  background: "#155275CC",
  borderRadius: "16px 0px 0px 16px",
  overflow: "hidden",
};

export const OPEN_BTN_WRAPPER_SX = {
  position: "absolute",
  top: 130,
  right: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
};

export const INDICATORS_WRAPPER_SX = {
  width: 5,
  bottom: -45,
  right: 0,
  py: "5px",
  borderBottomLeftRadius: 4,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  alignItems: "end",
  background: "rgba(21, 82, 117, 0.80)",
};

export const getIndicatorSx = (isValid: boolean): SxProps => ({
  width: 2,
  height: 16,
  color: "red",
  borderRadius: "4px 0px 0px 4px",
  background: isValid ? "#75CF6D" : "#F44336",
});
