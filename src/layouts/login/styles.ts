import { alpha, styled } from "@mui/material/styles";

import { bgBlur, bgGradient } from "@utils";

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
  margin: 16,
  borderRadius: "8px",
  ...bgBlur({
    color:
      theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.default,
  }),
  [theme.breakpoints.up("md")]: {
    padding: "45px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export const StyledSectionBg = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === "light" ? 0.9 : 0.94
    ),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: "100%",
  height: "100%",
  position: "absolute",
  transform: "scaleX(-1)",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  width: 480,
  margin: "auto",
  display: "flex",
  borderRadius: "8px",
  justifyContent: "center",
  padding: theme.spacing(5),
  ...bgBlur({ color: theme.palette.background.default }),
  [theme.breakpoints.up("md")]: {
    flexShrink: 0,
  },
}));
