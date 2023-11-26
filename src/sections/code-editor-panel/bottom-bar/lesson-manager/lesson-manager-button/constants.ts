import { type SxProps, type Theme } from "@mui/system";

export const getButtonSx = (theme: Theme): SxProps => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  p: 0,
  color: theme.palette.mode === "light" ? "initial" : "#fff",
  fontWeight: "400",
  "&:hover": {
    background: "none",
  },
  width: "175px",
  justifyContent: "flex-start",
});

export const ICON_BTN_SX = { mr: "5px" };
export const TYP_SX = {
  textOverflow: "ellipsis",
  overflow: " hidden",
  textTransform: "none",
};
