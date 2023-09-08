import { useContext } from "react";

import { useAtom } from "jotai";
import SwipeableViews from "react-swipeable-views";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Stack } from "@mui/system";

import { globalCodePanelAtom } from "../atoms/global-code-panel.atom";
import { mobileTabManager } from "../atoms/mobile-tab-manager.atom";
import { CodePanelContext } from "../context/CodePanel.context";
import CodeEditorBlock from "./blocks/code-editor-block";
import SliderBlock from "./blocks/slider-block";
import ViewBlock from "./blocks/view-block";

export type SupportedLang = "html" | "javascript";

const WorkSpace = (): React.ReactElement => {
  const theme = useTheme();

  const {
    lesson,
    onSubmitChalange,
    onSubmitLesson,
    data,
    user,
    code,
    onChangeCode,
    language,
  } = useContext(CodePanelContext);

  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));

  const [{ activeTab }, setTab] = useAtom(mobileTabManager);
  const [{ isBrowserHidden, isInstructionsHidden, slideIndex }] =
    useAtom(globalCodePanelAtom);

  if (isDesktop) {
    return (
      <Stack px={1} gap={1} display="flex" direction="row" alignItems="stretch">
        {!isInstructionsHidden ? (
          <SliderBlock
            onSubmitChalange={onSubmitChalange}
            onSubmitLesson={onSubmitLesson}
            data={data}
            integrations={lesson?.integrations ?? []}
          />
        ) : null}
        <CodeEditorBlock
          preloadedCode={data[slideIndex]?.preload_body || ""}
          validations={data[slideIndex]?.validations || ""}
          code={code}
          onChangeCode={onChangeCode}
          user={user}
        />
        {!isBrowserHidden ? <ViewBlock {...{ code, language }} /> : null}
      </Stack>
    );
  }

  return (
    <SwipeableViews
      index={activeTab}
      onChangeIndex={(index) => {
        setTab({ activeTab: index });
      }}
    >
      <SliderBlock
        onSubmitLesson={onSubmitLesson}
        onSubmitChalange={onSubmitChalange}
        data={data}
        integrations={lesson?.integrations ?? []}
      />
      <CodeEditorBlock
        code={code}
        onChangeCode={onChangeCode}
        user={user}
        preloadedCode={data[slideIndex]?.preload_body}
        validations={data[slideIndex]?.validations}
      />
      <ViewBlock {...{ code, language }} />
    </SwipeableViews>
  );
};

export default WorkSpace;
