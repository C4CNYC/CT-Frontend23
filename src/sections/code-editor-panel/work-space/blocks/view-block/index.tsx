import { type FC } from "react";
import { CgBrowser } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@mui/material";

import BaseBlock from "../base-block";
import BrowserView from "./browser-view";

import { type RootState } from "src/redux/store";
import { toggleBrowser } from "src/redux/slices/code-panel-global";

import { type SupportedLang } from "../..";

interface IVueBlock {
  code: string;
  language: SupportedLang;
}

const ViewBlock: FC<IVueBlock> = ({ code, language }) => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector(
    (state: RootState) => state.codePanelGlobal.isBrowserHidden
  );

  if (isBrowserHidden) {
    return null;
  }

  if (language === "html") {
    return (
      <BaseBlock
        title={TITLE}
        icon={icon}
        className="browserTour"
        hideTabsHandler={() => {
          dispatch(toggleBrowser(true))
        }}
      >
        <BrowserView value={code} />
      </BaseBlock>
    )
  }

  return (
    <BaseBlock title={TITLE} icon={icon}>
      <Typography
        mt="40px"
        textAlign="center"
        textTransform="uppercase"
        color="#c4c4c4"
        variant="h6"
      >
        LANGUAGE NOT SUPORTED
      </Typography>
    </BaseBlock>
  )
};

const TITLE = "Browser Preview";
const icon = <CgBrowser size="20px" color="#43D4DD" />;

export default ViewBlock;
