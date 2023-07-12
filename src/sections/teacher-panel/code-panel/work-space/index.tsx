import { useAtom } from "jotai";
import { useState } from "react";
import dynamic from "next/dynamic";
import SwipeableViews from "react-swipeable-views";

import { BaseResponseInterface } from "@utils";

import ViewBlock from "./blocks/view-block";
import SliderBlock from "./blocks/slider-block";
import { mobileTabManager } from "../atoms/mobile-tab-manager.atom";
import { globalCodePanelAtom } from "../atoms/global-code-panel.atom";
import { SupportedLang, WorkSpaceContext } from "../context/WorkSpace.context";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";

const CodeEditorBlock = dynamic(async () => await import("./blocks/code-editor-block"), { ssr: false })

interface IWorkSpace {
  data: Array<ILessonContent & BaseResponseInterface>;
  isFetching: boolean;
}

const WorkSpace = ({ data, isFetching }: IWorkSpace): React.ReactElement => {
  const [code, onChangeCode] = useState("")
  const [language, onChangeLanguage] = useState<SupportedLang>("html")
  const [{ activeTab }, setTab] = useAtom(mobileTabManager);
  const [{ slideIndex }] = useAtom(globalCodePanelAtom);

  return (
    <WorkSpaceContext.Provider value={{
      code,
      language,
      onChangeCode,
      onChangeLanguage
    }}>
    <SwipeableViews
      index={activeTab}
      onChangeIndex={(index: number) => {
        setTab({ activeTab: index });
      }}
    >
      <SliderBlock data={data} isFetching={isFetching} integrations={[]} />
      <CodeEditorBlock
        onChangeCode={onChangeCode}
        // preloadedCode={data[slideIndex]?.preload_body}
        validations={data[slideIndex]?.validations ?? []}
      />
      <ViewBlock {...{ code, language }} />
    </SwipeableViews>
    </WorkSpaceContext.Provider>
  );
};

export default WorkSpace;
