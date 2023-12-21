import dynamic from "next/dynamic";
import React, {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import _ from "lodash";
import { SlDirections } from "react-icons/sl";
import { TbArrowBarToLeft } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Carousel from "react-slick";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { EmptyContent, LoadingScreen } from "@components";
import { BaseResponseInterface } from "@utils";
import { LessonContentType } from "src/redux/enums/lesson-content-type.enum";
import { ILessonContent } from "src/redux/interfaces/content.interface";
import { IIntegration } from "src/redux/interfaces/integration.interface";
import {
  setSlideIndex,
  setSolutionCode,
  toggleInstrations,
} from "src/redux/slices/code-panel-global";
import { useSelector } from "src/redux/store";
import BrowserView, {
  CodeDocument,
} from "src/sections/code-editor-panel/work-space/blocks/view-block/browser-view/index";
import { useTranslate } from "src/utils/translateHelper";

import BaseBlock from "../base-block";
import { LOADER_SCREEN_SX, getBoxSx, getCarouselSettings } from "./constants";
import Navigation from "./navigation";

const ProsaMirrorView = dynamic(
  async () => await import("./prosa-mirror-view"),
  { ssr: false }
);

interface ISliderBlock {
  data: Array<ILessonContent & BaseResponseInterface>;
  onSubmitLesson: () => void;
  onSubmitChalange: (slideId: string, code?: string) => void;
  integrations: Array<IIntegration & BaseResponseInterface>;
  isFetching: boolean;
  code: string;
}

interface IView {
  type: LessonContentType;
  body: string;
  connectIntegrations: (body: string) => CodeDocument | null;
}

const icon = <SlDirections size="20px" color="#43D4DD" />;

const SliderBlock: FC<ISliderBlock> = ({
  data,
  onSubmitLesson,
  onSubmitChalange,
  integrations,
  isFetching,
  code,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex);
  const nextStepAble = useSelector(
    (state) => state.codePanelGlobal.nextStepAble
  );
  const translate = useTranslate();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));

  const title = translate("instructions");
  const takeHeaderSettings = useCallback((isOpen: boolean) => {
    setIsOpenHeader(isOpen);
  }, []);

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true);

  const carousel1 = useRef<Carousel | null>(null);
  const [nav2, setNav2] = useState<Carousel>();
  const hasNextStep = slideIndex < data.length - 1;
  const stepHasValidation = !!data[slideIndex]?.validations?.length;
  const boxSx = useMemo(
    () => getBoxSx(isDesktop, isOpenHeader),
    [isDesktop, isOpenHeader]
  );

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
      onSubmitChalange(data[slideIndex].id, code);
    }
    if (hasNextStep) {
      carousel1.current?.slickNext();
    } else {
      onSubmitLesson();
    }
  };

  const onBeforeChange = (_: number, next: number) => {
    dispatch(setSolutionCode(data[slideIndex]?.solution_body ?? ""));
    dispatch(setSlideIndex(next));
  };

  const connectIntegrations = (body: string): CodeDocument | null => {
    if (integrations) {
      return {
        htmlBody: [JSON.parse(body).content],
        cssBody: [integrations.reduce((ac, cur) => ac + cur.head, "")],
        jsBody: [integrations.reduce((ac, cur) => ac + cur.scripts, "")],
      };
    }
    return null;
  };

  return (
    <BaseBlock
      closeIcon={<TbArrowBarToLeft size={20} />}
      className="instructions"
      title={title}
      icon={icon}
      hideTabsHandler={() => {
        dispatch(toggleInstrations(true));
      }}
      takeHeaderSettings={takeHeaderSettings}
    >
      {_.isEmpty(data) ? (
        <EmptyContent title={translate("messages_no_data")} />
      ) : (
        <>
          <Box className="sliderTour" height="100%" sx={boxSx}>
            {!isFetching ? (
              <Carousel
                {...getCarouselSettings(onBeforeChange)}
                asNavFor={nav2}
                ref={carousel1}
              >
                {data.map((step) => {
                  return (
                    <View
                      key={step.id}
                      type={step.type}
                      body={step.body}
                      connectIntegrations={connectIntegrations}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <LoadingScreen sx={LOADER_SCREEN_SX} />
            )}
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

const View: FC<IView> = ({ type, body, connectIntegrations }) => {
  const translate = useTranslate();

  switch (type) {
    case "editable":
      return <ProsaMirrorView multimediaValue={body} />;
    case "code":
      return <BrowserView document={connectIntegrations(body)} />;
    default:
      return <>{translate("messages_content_type_not_supported")}</>;
  }
};

export default React.memo(SliderBlock);
