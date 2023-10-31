import {
  type FC,
  useEffect,
  useRef,
  useState,
  memo,
  useCallback
} from "react";
import { BiCodeAlt } from "react-icons/bi";

import { Box, Collapse, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { RealTimeEditor } from "@components";
import { CodeEditor } from "src/components/real-time-editor/editor";
import { CodingSymbols, CodingTools } from "./coding-controls";
import BaseBlock from "../base-block";
import HidedTabBtn from "./hided-tab-btn";
import MumuSpeedDial from "./mumu-speed-deal";
import Checkers from "./checkers-code-editor";

import { type BaseResponseInterface } from "@utils";
import { type AuthUserType } from "src/auth/types";
import { type IValidation } from "src/redux/interfaces/content.interface";
import { mapValidations } from "src/utils/validationMaping";

interface ICodeEditorBlock {
  user: AuthUserType | null;
  code: string;
  onChangeCode: (code: string) => void;
  validations: Array<IValidation & BaseResponseInterface>;
  preloadedCode: string;
}

const icon = <BiCodeAlt size="20px" color="#43D4DD" />;
const TITLE = "Code Editor";
const TYPING_DELEY = 20000;
const FIRST_LOADING_DELEY = 15000;
const MOBILE_HEIGHT = 80;
const DESKTOP_HEIGHT = 145;
const TIMEOUT = 1000

const CodeEditorBlock: FC<ICodeEditorBlock> = ({
  user,
  validations,
  code,
  onChangeCode,
  preloadedCode,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [codingSymbols, setCodingSymbols] = useState<boolean>(true);
  const [typing, setTyping] = useState<boolean | null>(null);
  const timer = useRef<NodeJS.Timeout>();

  const typingListener = (deley: number, firstLoad: boolean): void => {
    if (!firstLoad) {
      setTyping(false);
    }

    if (timer.current != null) {
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

  const symbolsHandler = useCallback((): void => {
    setCodingSymbols(!codingSymbols);
  }, [codingSymbols])

  return (
    <BaseBlock
      title={TITLE}
      icon={icon}
      className="codeEditorTour"
    >
      <style>
        {getTitleStyles(isDesktop)}
      </style>

      <HidedTabBtn />

      <MumuSpeedDial typing={typing} />

      {Boolean(validations?.length) && (
        <Checkers checkers={mapValidations(code ?? "", validations)} />
      )}

      {user?.id ? (
        <RealTimeEditor
          cursorText={user?.first_name}
          preloadedCode={preloadedCode}
          email={`${user?.first_name} ${user?.last_name?.[0]}.`}
          onChange={onChangeCode}
          userId={user?.id}
          code={code}
        />
      ) : (
        <CodeEditor
          code={code}
          onChangeCode={onChangeCode}
          preloadedCode={preloadedCode}
          userId={user?.id}
        />
      )}

      <Box sx={{ display: isDesktop ? "none" : "block" }}>
        <Collapse in={codingSymbols} timeout={!codingSymbols ? 0 : TIMEOUT}>
          <CodingSymbols symbolsHandler={symbolsHandler} />
        </Collapse>

        <Collapse in={!codingSymbols} timeout={codingSymbols ? 0 : TIMEOUT}>
          <CodingTools symbolsHandler={symbolsHandler} />
        </Collapse>
      </Box>
    </BaseBlock>
  );
};

const getTitleStyles = (isDesktop: boolean): string => {
  return `
  .cm-editor{
    height: calc(100vh - ${
      isDesktop ? DESKTOP_HEIGHT : MOBILE_HEIGHT
    }px)!important;
  }
  .cm-scroller::-webkit-scrollbar{
    width: 0px;
  }

`
}

export default memo(CodeEditorBlock);
