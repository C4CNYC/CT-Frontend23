import { Theme } from "@mui/material";

export const getDescriptionBoxSx = (theme: Theme) => ({
  bgcolor: theme.palette.mode === "light" ? "#FFEDF2" : "#212B36",
  p: 1,
  borderRadius: 1,
  position: "relative",
  zIndex: 1,
})

export const DESCRIPTION_GRADIENT_TEXT_SX = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "16px",
  color: "#0198ED",
  background: "linear-gradient(#7A16C9, #F618D3B5)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

export const LESSON_TIME_SX = {
  color: "current",
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  gap: "10px",
}
