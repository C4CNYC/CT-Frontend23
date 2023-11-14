import { type SxProps, type Theme } from "@mui/system";

export const CHECKERS_ANIMATION = {
  open: {
    height: "auto",
    opacity: 1,
  },
  closed: {
    height: "0px",
  },
};


export const getStackSx = (isBrowserHidden: boolean): SxProps<Theme> => ({
  top: isBrowserHidden ? "40px" : "38px",
  right: isBrowserHidden ? "45px" : "15px",
  position: "absolute",
  zIndex: 300,
});

export const BOX_SX = {
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  top: "8px",
  right: "7px",
  zIndex: 301,
  ":hover": {
    cursor: "pointer",
  },
};

export const ICONIFY_SX = {
  "& path": {
    fill: "#000000"
  }
}

export const M_DIV_STYLE = {
  background: "#155275CC",
  borderRadius: "16px",
  overflow: "hidden",
}
