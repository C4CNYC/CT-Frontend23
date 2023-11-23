import { type FC } from "react";

import { CgBrowser } from "react-icons/cg";
import { TbArrowBarToRight } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import { toggleBrowser } from "src/redux/slices/code-panel-global";
import { type RootState } from "src/redux/store";

import BaseBlock from "../base-block";
import BrowserView, { CodeDocument } from "./browser-view";

interface IVueBlock {
  code: CodeDocument | null;
}

const ViewBlock: FC<IVueBlock> = ({ code }) => {
  const dispatch = useDispatch();
  const isBrowserHidden = useSelector(
    (state: RootState) => state.codePanelGlobal.isBrowserHidden
  );

  if (isBrowserHidden) {
    return null;
  }

  return (
    <BaseBlock
      closeIcon={<TbArrowBarToRight size={20} />}
      isLeftBtn={true}
      title={TITLE}
      icon={icon}
      className="browserTour"
      hideTabsHandler={() => {
        dispatch(toggleBrowser(true));
      }}
    >
      <BrowserView document={code} />
    </BaseBlock>
  );
};

const TITLE = "Browser Preview";
const icon = <CgBrowser size="20px" color="#43D4DD" />;

export default ViewBlock;
