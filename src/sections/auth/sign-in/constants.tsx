import { Theme } from "@mui/material";

export const RESER_PASS_SX = {
  color: "#43D4DD",
  fontSize: ".8rem",
  textAlign: "right",
  mr: 2,
  mt: 1,
};
export const getButtonSx = (theme: Theme) => ({
  background: "#43D4DD33",
  color: "#43D4DD",
  fontSize: "1.5rem",
  mt: 4,
  mb: 2,
  "&:hover": {
    background: theme.palette.mode === "light" ? "" : "#fff",
  },
});
export const TYPO_CONT_SX = {
  alignItems: "center",
  ml: { xs: 3, sm: 3, md: 0 },
  mt: 1,
  mb: 4,
};
