import dynamic from "next/dynamic";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useAtom } from "jotai";
import _ from "lodash";
import { SlDirections } from "react-icons/sl";
import Carousel from "react-slick";

import { useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";

import { EmptyContent } from "@components";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { CodePanelContext } from "@sections/code-panel/context/CodePanel.context";
import { BaseResponseInterface } from "@utils";
import { LessonContentType } from "src/redux/enums/lesson-content-type.enum";
import { ILessonContent } from "src/redux/interfaces/content.interface";
import { IIntegration } from "src/redux/interfaces/integration.interface";

import BaseBlock from "../BaseBlock";
import BrowserView from "../view-block/BrowserView";
import LoaderDelay from "./components/LoaderDelay";
import Navigation from "./components/navigation";

const ProsaMirrorView = dynamic(
  async () => await import("./components/prosa-mirror-view"),
  { ssr: false }
);

interface ISliderBlock {
  data: Array<ILessonContent & BaseResponseInterface>;
  onSubmitLesson: () => void;
  onSubmitChalange: (slideId: string) => void;
  integrations: Array<IIntegration & BaseResponseInterface>;
}

interface IView {
  type: LessonContentType;
  body: string;
  connectIntegrations: (body: string) => string | undefined;
}

const title = "Instructions";
const icon = <SlDirections size="20px" color="#43D4DD" />;

const SliderBlock = ({
  data,
  onSubmitLesson,
  onSubmitChalange,
  integrations,
}: ISliderBlock): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { isFetching } = useContext(CodePanelContext);
  const [{ slideIndex, nextStepAble }, updateGlobalAtom] =
    useAtom(globalCodePanelAtom);
  const carousel1 = useRef<Carousel | null>(null);
  const [nav2, setNav2] = useState<Carousel>();
  const hasNextStep = slideIndex < data.length - 1;
  const stepHasValidation = !!data[slideIndex]?.validations?.length;

  useEffect(() => {
    carousel1.current?.slickGoTo(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    if (carousel1.current) {
      setNav2(carousel1.current);
    }
  }, [data]);

  const handlePrev = (): void => {
    carousel1.current?.slickPrev();
  };

  const handleNext = (skip = false): void => {
    if (stepHasValidation && !skip) {
      onSubmitChalange(data[slideIndex].id);
    }
    if (hasNextStep) {
      carousel1.current?.slickNext();
    } else {
      onSubmitLesson();
    }
  };

  const carouselSettings1 = {
    speed: 50,
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

  const connectIntegrations = (body: string): string | undefined => {
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
    <BaseBlock
      title={title}
      icon={icon}
      hideTabsHandler={() => {
        updateGlobalAtom((prev) => ({
          ...prev,
          isInstructionsHidden: true,
        }));
      }}
    >
      {_.isEmpty(data) ? (
        <EmptyContent title="No Data" />
      ) : (
        <>
          <Box
            className="sliderTour"
            height="100%"
            sx={{
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
            }}
          >
            <LoaderDelay deley={3000} isLoading={!!isFetching} />
            {!isFetching ? (
              <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
                {data.map((step) => (
                  <View
                    key={step.id}
                    type={step.type}
                    body={step.body}
                    connectIntegrations={connectIntegrations}
                  ></View>
                ))}
              </Carousel>
            ) : null}
          </Box>
          <Navigation
            hasPrev={slideIndex > 0}
            onNext={handleNext}
            onPrev={handlePrev}
            stepHasValidation={stepHasValidation}
            canMoveNext={nextStepAble || !stepHasValidation}
            hasNextStep={hasNextStep}
          />
        </>
      )}
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
      return <BrowserView value={connectIntegrations(body) ?? ""} />;
    default:
      return <>CONTENT TYPE NOT SUPPORTED</>;
  }
};

export default React.memo(SliderBlock);
