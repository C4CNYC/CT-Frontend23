import { type FC, useState } from "react";

import { CgBrowser } from "react-icons/cg";
import { TbArrowBarToRight } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import { toggleBrowser } from "src/redux/slices/code-panel-global";
import { type RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

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
  const translate = useTranslate();

  const TITLE = translate("browser_preview");

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true);

  const takeHeaderSettings = (isOpen: boolean) => {
    setIsOpenHeader(isOpen);
  };

  if (isBrowserHidden) {
    return null;
  }

  return (
    <BaseBlock
      closeIcon={<TbArrowBarToRight size={20} />}
      title={TITLE}
      icon={icon}
      className="browserTour"
      hideTabsHandler={() => {
        dispatch(toggleBrowser(true));
      }}
      takeHeaderSettings={takeHeaderSettings}
    >
      <BrowserView document={code} isOpenHeader={isOpenHeader} />
    </BaseBlock>
  );
};

const icon = <CgBrowser size="20px" color="#43D4DD" />;

export default ViewBlock;
