import dynamic from "next/dynamic";
import React, { type FC, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { SlDirections } from "react-icons/sl";
import _ from "lodash";

import Carousel from "react-slick";

import { useMediaQuery, useTheme, Box } from "@mui/material";

import { EmptyContent } from "@components";
import { BaseResponseInterface } from "@utils";
import { LessonContentType } from "src/redux/enums/lesson-content-type.enum";
import { ILessonContent } from "src/redux/interfaces/content.interface";
import { IIntegration } from "src/redux/interfaces/integration.interface";

import BaseBlock from "../base-block";
import BrowserView from "../view-block/browser-view";
import LoaderDelay from "./loader-delay";
import Navigation from "./navigation";
import { useSelector } from "src/redux/store";
import {
  setSlideIndex,
  setSolutionCode,
  toggleInstrations
} from "src/redux/slices/code-panel-global";
import { getBoxSx, getCarouselSettings } from "./constants";

const ProsaMirrorView = dynamic(
  async () => await import("./prosa-mirror-view"),
  { ssr: false }
);

interface ISliderBlock {
  data: Array<ILessonContent & BaseResponseInterface>;
  onSubmitLesson: () => void;
  onSubmitChalange: (slideId: string) => void;
  integrations: Array<IIntegration & BaseResponseInterface>;
  isFetching: boolean
}

interface IView {
  type: LessonContentType;
  body: string;
  connectIntegrations: (body: string) => string | undefined;
}

const title = "Instructions";
const icon = <SlDirections size="20px" color="#43D4DD" />;

const SliderBlock: FC<ISliderBlock> = ({
  data,
  onSubmitLesson,
  onSubmitChalange,
  integrations,
  isFetching,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const nextStepAble = useSelector((state) => state.codePanelGlobal.nextStepAble)
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));

  const carousel1 = useRef<Carousel | null>(null);
  const [nav2, setNav2] = useState<Carousel>();
  const hasNextStep = slideIndex < data.length - 1;
  const stepHasValidation = !!data[slideIndex]?.validations?.length;
  const boxSx = useMemo(() => getBoxSx(isDesktop), [isDesktop])

  useEffect(() => {
    carousel1.current?.slickGoTo(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    if (carousel1.current) {
      setNav2(carousel1.current);
    }
  }, [data]);

  const handlePrev = (): void => {
    console.log('hi')
    carousel1.current?.slickPrev();
  };

  const handleNext = (skip = false): void => {
    console.log('hello')
    if (stepHasValidation && !skip) {
      onSubmitChalange(data[slideIndex].id);
    }
    if (hasNextStep) {
      carousel1.current?.slickNext();
    } else {
      onSubmitLesson();
    }
  };

  const onBeforeChange = (_: number, next: number) => {
    dispatch(setSolutionCode(data[slideIndex]?.solution_body ?? ""))
    dispatch(setSlideIndex(next))
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
        dispatch(toggleInstrations(true))
      }}
    >
      {_.isEmpty(data) ? (
        <EmptyContent title="No Data" />
      ) : (
        <>
          <Box
            className="sliderTour"
            height="100%"
            sx={boxSx}
          >
            <LoaderDelay delay={3000} isLoading={!!isFetching} />

            {!isFetching ? (
              <Carousel {...getCarouselSettings(onBeforeChange)} asNavFor={nav2} ref={carousel1}>
                {data.map((step) => (
                  <View
                    key={step.id}
                    type={step.type}
                    body={step.body}
                    connectIntegrations={connectIntegrations}
                  />
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

const View: FC<IView> = ({
  type,
  body,
  connectIntegrations,
}) => {
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
