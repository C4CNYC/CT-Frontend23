/* eslint-disable no-new */
import React, { 
  useRef, 
  useState,
  useEffect, 
} from "react";
import { useAtom } from "jotai";
import { BiCodeAlt } from "react-icons/bi";
 
import { 
  Box, 
  Collapse, 
  useMediaQuery,
 } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { RealTimeEditor } from "@components";

import BaseBlock from "../BaseBlock";
import MumuSpeedDial from "./MumuSpeedDial";
import Checkers from "./checkers-code-editor";
import { AuthUserType } from "src/auth/types";
import { BaseResponseInterface } from "@utils";
import { mapValidations } from "src/utils/validationMaping";
import { CodingSymbols, CodingTools } from "./CodingControls";
import { IValidation } from "src/redux/interfaces/content.interface";
import BrowserTab from "@sections/code-panel/top-bar/nav-bar/options/BrowserTab";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";

const TYPING_DELEY = 20000;
const FIRST_LOADING_DELEY = 15000;
const MOBILE_HEIGHT = 80;
const DESKTOP_HEIGHT = 145;

interface ICodeEditorBlock {
  user: AuthUserType | null;
  columns?: 1 | 2;
  code: string;
  onChangeCode: (code: string) => void;
  validations: Array<IValidation & BaseResponseInterface>;
  preloadedCode: string;
}

const title = "Code Editor";
const icon = <BiCodeAlt size="20px" color="#43D4DD" />;

const CodeEditorBlock = ({
  user,
  columns = 1,
  validations,
  code,
  onChangeCode,
  preloadedCode,
}: ICodeEditorBlock): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [codingSymbols, setCodingSymbols] = useState<boolean>(true);
  const [typing, setTyping] = useState<boolean | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [{ isAllColumnsVisible }, setGlobalCodePanel] =
    useAtom(globalCodePanelAtom);
  const typingListener = (deley: number, firstLoad: boolean): void => {
    if (!firstLoad) {
      setTyping(false);
    }
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      setTyping(true);
    }, deley);
  };
  useEffect(() => {
    typingListener(FIRST_LOADING_DELEY, true);
  }, []);
  useEffect(() => {
    if (code) {
      typingListener(TYPING_DELEY, false);
    }
  }, [code]);

  const symbolsHandler = (): void => {
    setCodingSymbols(!codingSymbols);
  };

  return (
    <BaseBlock title={title} icon={icon} className="codeEditorTour">
      <style>
        {`
          .cm-editor{
            height: calc(100vh - ${
              isDesktop ? DESKTOP_HEIGHT : MOBILE_HEIGHT
            }px)!important;
          }
          .cm-scroller::-webkit-scrollbar{
            width: 0px;
          }
         
        `}
      </style>
      {isDesktop ? (
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{
            position: "absolute",
            top: isDesktop ? 34 : 50,
            right: 2,
            zIndex: 100,
          }}
        >
          <BrowserTab
            allColumnsVisible={isAllColumnsVisible}
            onChangeColumnVisability={(value) => {
              setGlobalCodePanel((prev) => ({
                ...prev,
                isAllColumnsVisible: value,
              }));
            }}
          />
        </Box>
      ) : null}
      <MumuSpeedDial typing={typing} />
      {validations?.length ? (
        <Checkers checkers={mapValidations(code ?? "", validations)} />
      ) : null}
      {user?.id ? (
        <RealTimeEditor
          preloadedCode={preloadedCode}
          email={`${user?.first_name} ${user?.last_name?.[0]}.`}
          onChange={onChangeCode}
          userId={user?.id}
          code={code}
        />
      ) : null}
      <Box sx={{ display: isDesktop ? "none" : "block" }}>
        <Collapse in={codingSymbols} timeout={!codingSymbols ? 0 : 1000}>
          <CodingSymbols symbolsHandler={symbolsHandler} />
        </Collapse>
        <Collapse in={!codingSymbols} timeout={codingSymbols ? 0 : 1000}>
          <CodingTools symbolsHandler={symbolsHandler} />
        </Collapse>
      </Box>
    </BaseBlock>
  );
};

export default React.memo(CodeEditorBlock);
