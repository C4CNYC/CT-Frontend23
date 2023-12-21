import { type SxProps } from "@mui/system";

export const getBoxSx = (
  isDesktop: boolean,
  isOpenHeader: boolean
): SxProps => ({
  overflowY: "scroll",
  scrollbarWidth: "none",
  height: isOpenHeader ? "calc(100vh - 80px)" : "calc(100vh - 110px)",
  "&::-webkit-scrollbar": {
    width: 0,
  },
  "& .slick-slider": {
    height: "100%",
  },
  "& .slick-list": {
    height: "100%",
  },
  "& .slick-track": {
    height: "100%",
    "& .slick-slide": {
      "&  div:first-of-type": {
        height: "100%",
      },
    },
  },
});

export const getCarouselSettings = (
  onBeforeChange: (_: number, next: number) => void
) => ({
  speed: 50,
  dots: false,
  arrows: false,
  slidesToShow: 1,
  draggable: false,
  slidesToScroll: 1,
  className: "innerDiv",
  beforeChange: onBeforeChange,
});

export const LOADER_SCREEN_SX = {
  position: "absolute",
  zIndex: 1,
  animation: "1.5s hide 2.5s forwards",
  "@keyframes hide": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
};
