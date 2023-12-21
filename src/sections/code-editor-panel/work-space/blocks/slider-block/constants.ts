import { type SxProps } from "@mui/system";

export const getBoxSx = (isDesktop: boolean): SxProps => ({
  overflowY: "scroll",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    width: 0,
  },
  "& .slick-track": {
    "& .slick-slide": {
      "&  div:first-of-type": {
        height: isDesktop ? "84vh" : "90vh",
      },
    },
  },
});

export const getCarouselSettings = (onBeforeChange: (_: number, next: number) => void) => ({
  speed: 50,
  dots: false,
  arrows: false,
  slidesToShow: 1,
  draggable: false,
  slidesToScroll: 1,
  className: "innerDiv",
  beforeChange: onBeforeChange
});
