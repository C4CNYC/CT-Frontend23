import { type SxProps, type Theme } from "@mui/system"

type StyleCodePanelKeys = "MainBox" 
  | "BoxTop"
  | "BoxBottomMain"
  | "BoxBottom"
  | "SkeletonSimpleVariant"
  | "SkeletonMedium"
  | "SkeletonBotton"
  | "SkeletonBoxBottom"
  | "SkeletonBoxBottomV2"

export const getSkeletonCodePanelStyles = (isDesktop: boolean): Record<StyleCodePanelKeys, SxProps<Theme>> => ({
  MainBox: {
    height: "100vh",
    width: "100%"
  },
  BoxTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 1,
    px: 1
  },
  BoxBottomMain: {
    width: "100%",
    height: "55px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 1,
    px: "40px",
  },
  BoxBottom: {
    width: "65%",
    display: "flex",
    justifyContent: isDesktop ? "space-between" : "flex-end",
    alignItems: "center",
  },
  SkeletonSimpleVariant: {
    width: {
      md: 0,
      lg: "100%"
    },
    height: "calc(100vh - 105px)"
  },
  SkeletonMedium: { 
    width: "100%",
    height: "calc(100vh - 105px)"
  },
  SkeletonBotton: {
    width: { xs: "20px", sm: "200px", md: "200px" },
    height: { sm: "20px", md: "36px" },
  },
  SkeletonBoxBottom: {
    display: isDesktop ? "block" : "none",
    width: "100%",
    height: "16px",
  },
  SkeletonBoxBottomV2: {
    width: "20px",
    height: "20px",
    ml: { sm: "0px", md: "20px" },
  }
})

type StyleTopBarKeys = "BoxMain"
  | "SkeletonTop"
  | "SkeletonMedium"
  | "DesktopSkeletonTop"
  | "DesktopSkeletonBottom"

export const getTopBarSkeletonStyles = (isDesktop: boolean): Record<StyleTopBarKeys, SxProps<Theme>> => ({
  BoxMain: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: isDesktop ? "space-between" : "",
    alignItems: "center",
    px: "40px",
  },
  SkeletonTop: {
    width: { xs: "20px", sm: "20px", md: "20px", lg: "197px" },
    height: { xs: "20px", sm: "20px", md: "20px", lg: "33px" },
  },
  SkeletonMedium: {
    display: isDesktop ? "none" : "block",
    margin: isDesktop ? "0" : "0 auto",
    width: { xs: "198px", sm: "248px", md: "248px", lg: "0px" },
    height: { xs: "39px", sm: "39px", md: "39px", lg: "0px" },
    borderRadius: "15px 15px 0 0 ",
  },
  DesktopSkeletonTop: {
    width: "237px",
    height: "40px",
    ml: "141px",
    borderRadius: "35px",
  },
  DesktopSkeletonBottom: {
    display: "block",
    width: "328px",
    height: "48px",
  }
})
