import { useRef, type FC, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Stack, type StackProps } from "@mui/system";

import CodeEditorBlock from "./blocks/code-editor-block";
import SliderBlock from "./blocks/slider-block";
import ViewBlock from "./blocks/view-block";
import NavPanel from "./blocks/nav-panel"

import { type BaseResponseInterface } from "@utils";
import { type ILesson, type ILessonContent } from "src/redux/interfaces/content.interface";
import { type AuthUserType } from "src/auth/types";

import { useSelector } from "src/redux/store";
import { setTab } from "src/redux/slices/mobile-tab-manager";
import { CodeDocument } from "./blocks/view-block/browser-view";

export type SupportedLang = "html" | "javascript";

export interface WorkSpaceProps {
  isFetching?: boolean
  lesson?: ILesson & BaseResponseInterface
  data: Array<ILessonContent & BaseResponseInterface>,
  user: AuthUserType
  code: string
  language: SupportedLang
  onChangeCode: (code: string) => void
  onSubmitChalange: (lessonContentId: string) => Promise<void>
  onSubmitLesson: () => Promise<void>
}

const WorkSpace: FC<WorkSpaceProps> = ({
  lesson,
  onSubmitChalange,
  onSubmitLesson,
  data,
  user,
  code,
  language,
  isFetching = false
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab);
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex);
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden);
  const [document, setDocument] = useState<CodeDocument | null>(null);

  const onChangeCode = useCallback((doc: Record<string, string>) => {
    setDocument(doc as CodeDocument)
  }, [])

  if (isDesktop) {
    return (
      <Stack ref={wrapperRef} {...STACK_PROPS}>
        {!isInstructionsHidden ? (
          <SliderBlock
            onSubmitChalange={onSubmitChalange}
            onSubmitLesson={onSubmitLesson}
            data={data}
            integrations={lesson?.integrations ?? []}
            isFetching={isFetching}
          />
        ) : null}

        <CodeEditorBlock
          preloadedCode={data[slideIndex]?.preload_body || ""}
          validations={data[slideIndex]?.validations || ""}
          code={code}
          user={user}
          onChangeCode={onChangeCode}
        />

        <ViewBlock code={document} />

        <NavPanel
          wrapperListenerRef={wrapperRef}
          cursorName={user?.first_name}
        />
      </Stack>
    );
  }

  return (
    <SwipeableViews
      index={activeTab}
      onChangeIndex={(index) => {
        dispatch(setTab(index));
      }}
    >
      <SliderBlock
        onSubmitLesson={onSubmitLesson}
        onSubmitChalange={onSubmitChalange}
        data={data}
        integrations={lesson?.integrations ?? []}
        isFetching={isFetching}
      />

      <CodeEditorBlock
        code={code}
        onChangeCode={onChangeCode}
        user={user}
        preloadedCode={data[slideIndex]?.preload_body}
        validations={data[slideIndex]?.validations}
      />

      <ViewBlock {...{ code: document, language }} />
    </SwipeableViews>
  );
};

const STACK_PROPS: StackProps = {
  px: 1,
  gap: 1,
  display: "flex",
  direction: "row",
  alignItems: "stretch"
}

export default WorkSpace;
