import { Theme } from "@mui/material";

export const getPageContainerSx = (isMobile: boolean, light: boolean) =>
  light
    ? {
        pt: isMobile ? 2 : 10,
        px: isMobile ? 1 : 8,
        background: !isMobile
          ? `linear-gradient(249.57deg, rgba(255, 255, 255, 0.8) 27.55%, 
                              rgba(255, 255, 255, 0.6) 44.53%, 
                              rgba(255, 255, 255, 0.24) 63.57%), 
              top left / contain url(/assets/projects/header_bg.png) no-repeat`
          : "",
      }
    : { pt: isMobile ? 2 : 10, px: isMobile ? 1 : 8 };
export const getBreadcrumbsSx = (isMobile: boolean, theme: Theme) => ({
  background:
    theme.palette.mode === "light"
      ? theme.palette.background.default
      : theme.palette.background.neutral,
  width: "fit-content",
  py: 1,
  px: isMobile ? 2 : 5,
  borderRadius: 4,
});
export const CONTAINER_SX = {
  flex: "1",
};
export const getHeaderContainerSx = (isMobile: boolean, theme: Theme) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
  background:
    theme.palette.mode === "light"
      ? "#FFEDF2"
      : theme.palette.background.neutral,
  borderRadius: 3,
  px: isMobile ? 2 : 5,
  py: 2,
});
export const CHIP_SX = {
  background: "transparent",
  border: "1px solid #919EAB52",
  borderRadius: 1,
};
export const HEADER_IMG_SX = {
  flexShrink: 0,
  width: "250px",
  height: "250px",
  m: "0 auto",
  borderRadius: "25px",
};
export const getLessonListSx = (isMobile: boolean, theme: Theme) => ({
  gap: isMobile ? 2 : 4,
  mt: isMobile ? 2 : 6,
  background:
    theme.palette.mode === "light"
      ? "#FFEDF2"
      : theme.palette.background.neutral,
  px: isMobile ? 2 : 6,
  pb: isMobile ? 4 : 10,
  pt: 2,
  borderRadius: 3,
});
export const SWITCH_BTN_SX = {
  minWidth: "auto",
  background: "#fff",
};
