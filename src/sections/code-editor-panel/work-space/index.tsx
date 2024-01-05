import { type FC, useCallback, useRef, useState } from "react";

import { FaDesktop } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Stack, type StackProps } from "@mui/system";

import { type BaseResponseInterface } from "@utils";
import { type AuthUserType } from "src/auth/types";
import {
  type ILesson,
  type ILessonContent,
} from "src/redux/interfaces/content.interface";
import {
  toggleBrowser,
  toggleInstrations,
} from "src/redux/slices/code-panel-global";
import { useSocket } from "@hooks";
import { useAuthContext } from "src/auth/useAuthContext";
import { setTab } from "src/redux/slices/mobile-tab-manager";
import { useSelector } from "src/redux/store";

import CodeEditorBlock from "./blocks/code-editor-block";
import HidedTabBtn from "./blocks/code-editor-block/hided-tab-btn";
import NavPanel from "./blocks/nav-panel";
import SliderBlock from "./blocks/slider-block";
import ViewBlock from "./blocks/view-block";
import { CodeDocument } from "./blocks/view-block/browser-view";

export type SupportedLang = "html" | "javascript";

export const TAB_TITLES = {
  instructions: "Instructions",
  browser_preview: "Browser Preview",
};

export interface WorkSpaceProps {
  isFetching?: boolean;
  lesson?: ILesson & BaseResponseInterface;
  data: Array<ILessonContent & BaseResponseInterface>;
  user: AuthUserType;
  code: string;
  language: SupportedLang;
  onChangeCode: (code: string) => void;
  onSubmitChalange: (lessonContentId: string) => Promise<void>;
  onSubmitLesson: () => Promise<void>;
  lastLessonCode?: string;
}

let previousLength: number | null = null;
let checkValueTimeout: any | null = null;

const WorkSpace: FC<WorkSpaceProps> = ({
  lesson,
  onSubmitChalange,
  onSubmitLesson,
  data,
  user,
  code,
  language,
  isFetching = false,
  lastLessonCode,
}) => {
  const theme = useTheme();
  const socket = useSocket();
  const router = useRouter();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab);
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex);

  const isBrowserHidden = useSelector(
    (state) => state.codePanelGlobal.isBrowserHidden
  );

  const isInstructionsHidden = useSelector(
    (state) => state.codePanelGlobal.isInstructionsHidden
  );

  const [document, setDocument] = useState<CodeDocument | null>(null);

  const onChangeCode = (doc: Record<string, string>) => {
    try {
      console.log("onchangetext1", doc);
      console.log("onchangetext1 infomation", user);
      console.log("onchangetext1_:", user?.id);
      console.log("onchangetext1__:", router?.query?.lessonId);

      if (checkValueTimeout) {
        // Clear the previous timeout if the value changes
        clearTimeout(checkValueTimeout);
      }

      previousLength = doc?.htmlBody?.length; // Store the current value
      if (router.query.lessonId && user)
        socket.emit('changeStatusInLesson', { lesson: router.query.lessonId, user: user?.id, status: 'active' });

      // Set up the check for 30 seconds later
      checkValueTimeout = setTimeout(() => {
        if (doc?.htmlBody?.length === previousLength) {
          console.log(`Value after 30 seconds: ${doc} (unchanged)`);
          socket.emit('changeStatusInLesson', { lesson: router.query.lessonId, user: user?.id, status: 'idle' });
        } else {
          console.log('Value has changed');
        }
      }, 30000); // 30 seconds

      setDocument(doc as CodeDocument);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const openInstruction = () => {
    dispatch(toggleInstrations(false));
  };

  const openPreview = () => {
    dispatch(toggleBrowser(false));
  };

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
            code={document?.htmlBody?.join("") ?? ""}
          />
        ) : (
          <HidedTabBtn
            title={TAB_TITLES.instructions}
            icon={<TiDocumentText size={20} />}
            openPanelFnc={openInstruction}
          />
        )}

        <CodeEditorBlock
          preloadedCode={lastLessonCode || data[slideIndex]?.preload_body || ""}
          validations={data[slideIndex]?.validations || ""}
          code={document?.htmlBody?.join("") ?? ""}
          user={user}
          onChangeCode={onChangeCode}
        />

        {!isBrowserHidden ? (
          <ViewBlock code={document} />
        ) : (
          <HidedTabBtn
            title={TAB_TITLES.browser_preview}
            icon={<FaDesktop size={20} />}
            openPanelFnc={openPreview}
          />
        )}

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
        code={document?.htmlBody?.join("") ?? ""}
      />

      <CodeEditorBlock
        code={document?.htmlBody?.join("") ?? ""}
        onChangeCode={onChangeCode}
        user={user}
        preloadedCode={lastLessonCode ?? data[slideIndex]?.preload_body}
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
  alignItems: "stretch",
};

export default WorkSpace;
