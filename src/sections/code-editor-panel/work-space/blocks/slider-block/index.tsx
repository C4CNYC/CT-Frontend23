import dynamic from "next/dynamic";
import React, { type FC, useEffect, useMemo, useRef, useState } from "react";

import _ from "lodash";
import { parse } from "node-html-parser";
import { SlDirections } from "react-icons/sl";
import { TbArrowBarToLeft } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Carousel from "react-slick";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { EmptyContent } from "@components";
import { BaseResponseInterface } from "@utils";
import { useLoadIntegration } from "src/hooks/useLoadIntegration";
import { LessonContentType } from "src/redux/enums/lesson-content-type.enum";
import { ILessonContent } from "src/redux/interfaces/content.interface";
import { IIntegration } from "src/redux/interfaces/integration.interface";
import {
  setSlideIndex,
  setSolutionCode,
  toggleInstrations,
} from "src/redux/slices/code-panel-global";
import { useSelector } from "src/redux/store";
import BrowserView from "src/sections/code-panel/work-space/blocks/view-block/BrowserView";

import BaseBlock from "../base-block";
import { getBoxSx, getCarouselSettings } from "./constants";
import LoaderDelay from "./loader-delay";
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
  code,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex);
  const nextStepAble = useSelector(
    (state) => state.codePanelGlobal.nextStepAble
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [loadingIntegrations, setLoadingIntegrations] = useState<boolean>(true);
  const [loadedIntegrations, setLoadedIntegrations] = useState<
    { head?: string; script?: string }[]
  >([]);

  const carousel1 = useRef<Carousel | null>(null);
  const [nav2, setNav2] = useState<Carousel>();
  const hasNextStep = slideIndex < data.length - 1;
  const stepHasValidation = !!data[slideIndex]?.validations?.length;
  const boxSx = useMemo(() => getBoxSx(isDesktop), [isDesktop]);

  useEffect(() => {
    carousel1.current?.slickGoTo(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    if (carousel1.current) {
      setNav2(carousel1.current);
    }
  }, [data]);

  useEffect(() => {
    const loadAllIntegrations = async () => {
      if (!integrations) return;
      setLoadingIntegrations(true);

      const loadedIntegrations = await Promise.all(
        integrations.map(async ({ head, scripts }) => {
          const loadedIntegration = { head: "", script: "" };
          if (head) {
            const parsedHead = parse(head).querySelectorAll("link");
            const links = await Promise.all(
              parsedHead.map(async ({ attrs }) =>
                useLoadIntegration(attrs, "href")
              )
            );
            loadedIntegration.head = links
              .filter(Boolean)
              .map((style) => `<style>${style}</style>`)
              .join("\n");
          }
          if (scripts) {
            const parseScript = parse(scripts).querySelectorAll("script");
            const allScripts = await Promise.all(
              parseScript.map(async ({ attrs }) =>
                useLoadIntegration(attrs, "src")
              )
            );
            loadedIntegration.script = allScripts
              .filter(Boolean)
              .map((script) => `<script>${script}</script>`)
              .join("\n");
          }
          return loadedIntegration;
        })
      );
      setLoadedIntegrations(loadedIntegrations);
      setLoadingIntegrations(false);
    };
    loadAllIntegrations();
  }, [integrations]);

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

  const connectIntegrations = (body: string): string | undefined => {
    if (integrations) {
      return `<head>${loadedIntegrations.reduce(
        (ac, cur) => ac + cur.head,
        ""
      )}</head><main>${JSON.parse(body).content}${loadedIntegrations.reduce(
        (ac, cur) => ac + cur.script,
        ""
      )}</main>`;
    }
  };

  return (
    <BaseBlock
      closeIcon={<TbArrowBarToLeft size={20} />}
      isLeftBtn={false}
      isLeftBlock={true}
      className="instructions"
      title={title}
      icon={icon}
      hideTabsHandler={() => {
        dispatch(toggleInstrations(true));
      }}
    >
      {_.isEmpty(data) ? (
        <EmptyContent title="No Data" />
      ) : (
        <>
          <Box className="sliderTour" height="100%" sx={boxSx}>
            <LoaderDelay
              delay={3000}
              isLoading={!!isFetching || !!loadingIntegrations}
            />

            {!isFetching ? (
              <Carousel
                {...getCarouselSettings(onBeforeChange)}
                asNavFor={nav2}
                ref={carousel1}
              >
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

const View: FC<IView> = ({ type, body, connectIntegrations }) => {
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
