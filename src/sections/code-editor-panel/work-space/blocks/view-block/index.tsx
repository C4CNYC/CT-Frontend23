import { type FC } from "react";
import { CgBrowser } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@mui/material";

import BaseBlock from "../base-block";
import BrowserView, { CodeDocument } from "./browser-view";

import { type RootState } from "src/redux/store";
import { toggleBrowser } from "src/redux/slices/code-panel-global";

import { type SupportedLang } from "../..";

interface IVueBlock {
  code: CodeDocument | null;
}

const ViewBlock: FC<IVueBlock> = ({ code }) => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector(
    (state: RootState) => state.codePanelGlobal.isBrowserHidden
  );

  if (isBrowserHidden) {
    return null;
  }

  return (
    <BaseBlock
        title={TITLE}
        icon={icon}
        className="browserTour"
        hideTabsHandler={() => {
          dispatch(toggleBrowser(true))
        }}
      >
        <BrowserView document={code} />
      </BaseBlock>
  )
};

const TITLE = "Browser Preview";
const icon = <CgBrowser size="20px" color="#43D4DD" />;

export default ViewBlock;
