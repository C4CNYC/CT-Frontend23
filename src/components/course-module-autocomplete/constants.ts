import { alpha } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

export const BOX_SX = {
  mr: 1.5,
  width: 32,
  height: 32,
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
};

export const getItemWrapperSx = (theme: Theme): SxProps => ({
  top: 0,
  opacity: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: alpha(theme.palette.grey[900], 0.8),
});
