/* eslint-disable no-new */
import React, { useEffect, useRef, useState } from "react";

import { BiCodeAlt } from "react-icons/bi";

import { Box, Collapse, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import CodeEditorCollab from "src/components/code-editor-collab";
import { BaseResponseInterface } from "@utils";
import { AuthUserType } from "src/auth/types";
import { CodeEditor } from "src/components/real-time-editor/editor";
import { IValidation } from "src/redux/interfaces/content.interface";
import { mapValidations } from "src/utils/validationMaping";

import BaseBlock from "../BaseBlock";
import { CodingSymbols, CodingTools } from "./CodingControls";
import HidedTabBtn from "./HidedTabBtn";
import MumuSpeedDial from "./MumuSpeedDial";
import Checkers from "./checkers-code-editor";

const TYPING_DELEY = 20000;
const FIRST_LOADING_DELEY = 15000;
const MOBILE_HEIGHT = 80;
const DESKTOP_HEIGHT = 145;

interface ICodeEditorBlock {
  user: AuthUserType | null;
  code: string;
  onChangeCode: (code: string) => void;
  validations: Array<IValidation & BaseResponseInterface>;
  preloadedCode: string;
}

const title = "Code Editor";
const icon = <BiCodeAlt size="20px" color="#43D4DD" />;

const CodeEditorBlock = ({
  user,
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
      <HidedTabBtn />
      <MumuSpeedDial typing={typing} />
      {validations?.length ? (
        <Checkers checkers={mapValidations(code ?? "", validations)} />
      ) : null}
      {user?.id ? (
        <CodeEditorCollab
          preloadedCode={preloadedCode}
          cursorText={`${user?.first_name} ${user?.last_name?.[0]}.`}
          onChange={onChangeCode}
          roomId={user?.id}
          code={code}
        />
      ) : (
        <CodeEditor
          code={code}
          onChangeCode={onChangeCode}
          preloadedCode={preloadedCode}
        />
      )}
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
