import { type SxProps } from "@mui/material"

export const BOX_HEIGHT = 276;

export const getBoxSx = (background: string): SxProps => ({
  width: 355,
  height: BOX_HEIGHT,
  borderRadius: "15px",
  border: "1px solid black",
  fontSize: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background,
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  position: "relative",
  overflow: "hidden"
})

export const getHeaderSx = (background: string): SxProps => ({
  background,
  height: "28px",
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
})