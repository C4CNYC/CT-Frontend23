import { type Theme } from "@mui/material"

export const BOX_SX = {
  position: "absolute",
  bottom: "15px",
  left: "0",
  width: "100%",
  zIndex: "11",
}

export const getNestedBoxSx = (theme: Theme) => ({
  display: "flex",
  justifyContent: "center",
  maxWidth: "450px",
  height: "50px",
  width: "100%",
  margin: "0 auto",
  position: "relative",
  [theme.breakpoints.down(450)]: {
    px: "5px",
  },
})