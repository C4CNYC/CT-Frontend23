import { useRef, useState } from "react";
// @mui
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
import Carousel, { CarouselArrowIndex } from "@components/carousel";
import Image from "@components/image";

// ----------------------------------------------------------------------

interface Props {
  data: Array<{
    id: string;
    title: string;
    image: string;
    description: string;
  }>;
}

export default function CarouselBasic2({
  data,
}: Props): React.ReactElement | null {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const [currentIndex, setCurrentIndex] = useState(2);

  const carouselSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentIndex,
    fade: Boolean(theme.direction !== "rtl"),
    rtl: Boolean(theme.direction === "rtl"),
    beforeChange: (current: number, next: number) => {
      setCurrentIndex(next);
    },
  };

  const handlePrev = (): void => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = (): void => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {data.map((item) => (
          <Stack key={item.id}>
            <Image alt={item.title} src={item.image} ratio="4/3" />

            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h6" noWrap gutterBottom>
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {item.description}
              </Typography>
            </CardContent>
          </Stack>
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={data.length}
        onNext={handleNext}
        onPrevious={handlePrev}
        sx={{ bottom: 120 }}
      />
    </Card>
  );
}
