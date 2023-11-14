import { SxProps, Theme } from "@mui/material";

export const styledRegisterInput = (theme: Theme, sx?: SxProps): SxProps => ({
  "& .MuiInputBase-root": {
    height: "52px",
    background:
      theme.palette.mode === "light" ? theme.palette.grey[200] : "initial",
  },
  "& fieldset": {
    border: theme.palette.mode === "light" ? "none" : "",
  },
  "& input:-webkit-autofill": {
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": theme.palette.mode === "light" ? "#000" : "#fff",
    transition: "background-color 5000s ease-in-out 0s",
    boxShadow: `inset 0 0 .1px .1px ${theme.palette.grey[200]}`,
  },
  ...sx,
});
