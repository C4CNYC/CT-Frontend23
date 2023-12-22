import { Theme } from "@mui/material";

export const getParentStackSx = (isLight: boolean) => ({
  bgcolor: isLight ? "#F2F2F2" : "",
  p: 1,
});
export const getSkeletonSx = (isLight: boolean) => ({
  bgcolor: isLight ? "#D9D9D9" : "",
});
export const getStackBottonSx = (isLight: boolean, theme: Theme) => ({
  backgroundColor: isLight
    ? theme.palette.background.default
    : theme.palette.background.neutral,
  width: "100%",
  height: "calc(91vh - 80px)",
  borderRadius: "10px",
});

export const AVAILABLE_TYP_SX = {
  mt: "58px",
  mb: "20px",
  textAlign: "center",
  color: "#c4c4c4",
  fontSize: "1.1rem",
};

export const CODING_TYP_SX = {
  m: "0px auto",
  textAlign: "center",
  color: "#c4c4c4",
  fontSize: "1.1rem",
  maxWidth: "250px",
};
