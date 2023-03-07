import { m } from "framer-motion";
import { useRef, useState } from "react";
// @mui
import { Card, CardProps, Link, Stack, Typography } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
// components
import { MotionContainer, varFade } from "@components/animate";
import Carousel, { CarouselArrows, CarouselDots } from "@components/carousel";
import Image from "@components/image";

// ----------------------------------------------------------------------

const StyledOverlay = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

interface ItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface Props extends CardProps {
  list: ItemProps[];
}

export default function AppFeatured({
  list,
  ...other
}: Props): React.ReactElement | null {
  const theme = useTheme();

  const carouselRef = useRef<Carousel>(null);

  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === "rtl" ? list.length - 1 : 0
  );

  const carouselSettings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    beforeChange: (current: number, next: number) => {
      setCurrentIndex(next);
    },
    ...CarouselDots({
      sx: {
        top: 170,
        left: 110,
        position: "absolute",
      },
    }),
  };

  const handlePrev = (): void => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = (): void => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card {...other}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem
            key={app.id}
            item={app}
            isActive={index === currentIndex}
          />
        ))}
      </Carousel>
      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrev}
        sx={{ top: 10, right: 8, position: "absolute", color: "common.white" }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

interface CarouselItemProps {
  item: ItemProps;
  isActive?: boolean;
}

function CarouselItem({
  item,
  isActive,
}: CarouselItemProps): React.ReactElement | null {
  const { image, title, description } = item;

  return (
    <MotionContainer action animate={isActive} sx={{ position: "relative" }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 1,
          zIndex: 9,
          textAlign: "left",
          position: "absolute",
          color: "common.white",
        }}
      >
        <m.div variants={varFade().inRight}>
          <Link color="inherit" underline="none">
            <Typography variant="h6" fontWeight="700" fontSize="20px" noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography
            variant="body2"
            fontWeight="400"
            fontSize="14px"
            width="193px"
          >
            {description}
          </Typography>
        </m.div>
      </Stack>
      <StyledOverlay />

      <Image alt={title} src={image} />
    </MotionContainer>
  );
}
