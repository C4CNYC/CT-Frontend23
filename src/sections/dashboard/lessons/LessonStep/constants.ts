import { SxProps } from "@mui/material";

export const GREEN_DOT_SX = {
  position: "absolute",
  top: -10,
  right: -10,
  width: 20,
  height: 20,
  borderRadius: "100%",
  backgroundColor: "#00AB55",
  boxShadow: 3,
};

export const getLessonItemPaperSx = (
  chooseColor: () => string,
  sx?: SxProps
): SxProps => ({
  cursor: "pointer!important",
  display: "flex",
  p: "10px 10px 10px 5px",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  position: "relative",
  border: `2px solid ${chooseColor()}`,
});
