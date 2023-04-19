import Carousel from "@components/carousel";
import { Box } from "@mui/system";
import { globalCodePanelAtom } from "@sections/teacher-panel/code-panel/atoms/global-code-panel.atom";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { LessonContentType } from "src/redux/services/enums/lesson-content-type.enum";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import { IIntegration } from "src/redux/services/interfaces/integration.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import BaseBlock from "../BaseBlock";
import BrowserView from "../view-block/BrowserView";

const ProsaMirrorView = dynamic(
  async () => await import("./components/ProsaMirrorView"),
  { ssr: false }
);

interface ISliderBlock {
  data: Array<ILessonContent & BaseResponseInterface>;
  integrations: IIntegration[];
}

interface IView {
  type: LessonContentType;
  body: string;
  connectIntegrations: (body: string) => void;
}

const SliderBlock = ({
  data,
  integrations,
}: ISliderBlock): React.ReactElement => {
  const [{ slideIndex }, updateGlobalAtom] = useAtom(globalCodePanelAtom);
  const carousel1 = useRef<Carousel | null>(null);
  const [nav2, setNav2] = useState<Carousel>();

  useEffect(() => {
    carousel1.current?.slickGoTo(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    if (carousel1.current) {
      setNav2(carousel1.current);
    }
  }, []);

  const carouselSettings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    className: "innerDiv",
    // adaptiveHeight: true,
    beforeChange: (current: number, next: number) => {
      updateGlobalAtom((prev) => ({
        ...prev,
        solutionCode: data[slideIndex]?.solution_body ?? "",
        slideIndex: next,
      }));
    },
  };

  const connectIntegrations = (body: string) => {
    if (integrations) {
      return `<head>${integrations.reduce(
        (ac, cur) => ac + cur.head,
        ""
      )}</head><main>${JSON.parse(body).content}${integrations.reduce(
        (ac, cur) => ac + cur.scripts,
        ""
      )}</main>`;
    }
  };

  return (
    <BaseBlock>
      {/* <LoadingScreen
        sx={{
          position: "absolute",
          animation: "1s ease-in 1.5s hide forwards",
          "@keyframes hide": {
            "0%": {
              opacity: 1,
            },
            "100%": {
              opacity: 0,
              zIndex: -1,
            },
          },
        }}
      /> */}
      <Box
        height="100%"
        sx={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: 0,
          },
          "& .slick-track": {
            "& .slick-slide": {
              "& div": {
                height: "80vh",
              },
            },
          },
        }}
      >
        <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
          {data.map((step) => (
            <View
              key={step.id}
              type={step.type}
              body={step.body}
              connectIntegrations={connectIntegrations}
            />
          ))}
        </Carousel>
      </Box>
    </BaseBlock>
  );
};

const View = ({
  type,
  body,
  connectIntegrations,
}: IView): React.ReactElement => {
  switch (type) {
    case "editable":
      return <ProsaMirrorView multimediaValue={body} />;
    case "code":
      return <BrowserView value={body} />;
    default:
      return <>CONTENT TYPE NOT SUPORTED</>;
  }
};

export default SliderBlock;
