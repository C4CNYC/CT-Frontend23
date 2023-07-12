import { useRef } from "react";
import NextLink from "next/link";
import Carousel from "react-slick";

import { Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Image } from "../image";
import { TextMaxLine } from "../text-max-line";
import { 
  CarouselDots,
  CarouselArrows, 
} from "../carousel";

import { MenuCarouselProps } from "./types";

export function MenuCarousel({
  products,
  numberShow,
  sx,
}: MenuCarouselProps): React.ReactElement | null {
  const theme = useTheme();
  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    rtl: Boolean(theme.direction === "rtl"),
    ...CarouselDots(),
  };

  const handlePrev = (): void => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = (): void => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: "relative", ...sx }}>
      <CarouselArrows
        filled
        onNext={handleNext}
        onPrevious={handlePrev}
        leftButtonProps={{
          size: "small",
          sx: { top: 56, left: -8 },
        }}
        rightButtonProps={{
          size: "small",
          sx: { top: 56, right: -8 },
        }}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {products.map((product) => (
            <Box key={product.name} sx={{ px: 1, textAlign: "center" }}>
              <Link
                component={NextLink}
                href={product.path}
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  transition: theme.transitions.create("all"),
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Image
                  alt={product.image}
                  src={product.image}
                  ratio="1/1"
                  disabledEffect
                  sx={{ borderRadius: 1, mb: 1 }}
                />

                <TextMaxLine
                  line={2}
                  variant="caption"
                  sx={{ fontWeight: "fontWeightMedium" }}
                >
                  {product.name}
                </TextMaxLine>
              </Link>
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}
