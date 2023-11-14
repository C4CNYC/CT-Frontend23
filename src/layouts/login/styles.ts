// @mui
import { alpha, styled } from "@mui/material/styles";

// utils
import { bgGradient } from "@utils";

// ----------------------------------------------------------------------

export const StyledRoot = styled("main")(() => ({
  height: "100%",
  display: "flex",
  position: "relative",
  backgroundColor: "#E6FBFC",
}));

export const StyledSection = styled("div")(({ theme }) => ({
  display: "none",
  position: "relative",
  backgroundColor: "white",
  margin: 16,
  borderRadius: "8px",
  [theme.breakpoints.up("md")]: {
    // flexGrow: 1,
    padding: "45px",
    display: "flex",
    // alignItems: "center",
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
  // minHeight: "100vh",
  justifyContent: "center",
  backgroundColor: "#fff",
  padding: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    flexShrink: 0,
  },
}));
