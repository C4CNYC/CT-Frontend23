import { useAtom } from "jotai";
import SwipeableViews from "react-swipeable-views";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { globalCodePanelAtom } from "../atoms/global-code-panel.atom";
import { mobileTabManager } from "../atoms/mobile-tab-manager.atom";
import { useWorkSpaceManager } from "../hooks/useWorkSpaceManager.hook";
import SliderBlock from "./blocks/slider-block";
import ViewBlock from "./blocks/view-block";
import dynamic from "next/dynamic";

const CodeEditorBlock = dynamic(async () => await import("./blocks/code-editor-block"), { ssr: false })

interface IWorkSpace {
  data: Array<ILessonContent & BaseResponseInterface>;
}

const WorkSpace = ({ data }: IWorkSpace): React.ReactElement => {
  const { code } = useWorkSpaceManager();
  const [{ activeTab }, setTab] = useAtom(mobileTabManager);
  const [{ slideIndex }] = useAtom(globalCodePanelAtom);

  return (
    <SwipeableViews
      index={activeTab}
      onChangeIndex={(index: number) => {
        setTab({ activeTab: index });
      }}
    >
      <SliderBlock data={data} integrations={[]} />
      <CodeEditorBlock
        preloadedCode={data[slideIndex]?.preload_body}
        validations={data[slideIndex]?.validations ?? []}
      />
      <ViewBlock {...code} />
    </SwipeableViews>
  );
};

export default WorkSpace;
