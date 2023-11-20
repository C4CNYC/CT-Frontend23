import { styled } from "@mui/material/styles";

import { bgBlur } from "@utils";

export const StyledRoot = styled("main")(({ theme }) => ({
  height: "100%",
  display: "flex",
  position: "relative",
  backgroundColor:
    theme.palette.mode === "light" ? "#E6FBFC" : "rgba(54, 73, 84, 1)",
}));

export const StyledSection = styled("div")(({ theme }) => ({
  display: "none",
  position: "relative",
  backgroundColor: "#E6FBFC",
  ...bgBlur({
    color:
      theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.default,
  }),
  margin: 16,
  borderRadius: "8px",
  [theme.breakpoints.up("md")]: {
    padding: "45px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export const StyledSectionBg = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: -1,
  width: "100%",
  height: "100%",
  position: "absolute",
  transform: "scaleX(-1)",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  width: "100%",
  margin: "auto 20px",
  display: "flex",
  borderRadius: "8px",
  justifyContent: "center",
  padding: theme.spacing(5),
  ...bgBlur({ color: theme.palette.background.default }),
  [theme.breakpoints.up("md")]: {
    flexShrink: 0,
    width: 480,
    margin: "auto",
  },
}));
