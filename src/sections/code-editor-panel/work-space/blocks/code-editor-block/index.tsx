import {
  type FC,
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
  ReactNode
} from "react";
import { BiCodeAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";

import {
  Box,
  Collapse,
  Stack,
  useMediaQuery,
  IconButton
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Close from "@mui/icons-material/Close";

import CodeEditorController from "../code-editor-controller";
import { CodingSymbols, CodingTools } from "./coding-controls";
import BaseBlock from "../base-block";
import HidedTabBtn from "./hided-tab-btn";
import MumuSpeedDial from "./mumu-speed-deal";
import Checkers from "./checkers-code-editor";
import Title from "./title";

import { type BaseResponseInterface } from "@utils";
import { type AuthUserType } from "src/auth/types";
import { type IValidation } from "src/redux/interfaces/content.interface";
import { mapValidations } from "src/utils/validationMaping";
import { CodeEditorControllerRoom, setRoom } from "src/redux/slices/code-editor-controller";
import { EditorMode } from "src/components/code-editor-collab/hook/constants";
import { useSelector } from "src/redux/store";

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
const TIMEOUT = 1000;

const CodeEditorBlock: FC<ICodeEditorBlock> = ({
  user,
  validations,
  code,
  onChangeCode,
  preloadedCode,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [codingSymbols, setCodingSymbols] = useState<boolean>(true);
  const [typing, setTyping] = useState<boolean | null>(null);
  const room = useSelector(state => state.codeEditorController.room);
  const timer = useRef<NodeJS.Timeout>();
  const preloadedCodeRef = useRef(preloadedCode);
  const codeRef= useRef(code);

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
  }, [codingSymbols]);

  const onResetRoom = useCallback(() => {
    dispatch(setRoom({
      roomId: user?.id as string,
      cursorText: user?.first_name as string,
      preloadedCode: preloadedCodeRef.current,
      code: codeRef.current,
      mode: EditorMode.Owner
    }))
  }, [user, dispatch]);

  useEffect(() => {
    onResetRoom();
  }, [onResetRoom]);

  return (
    <BaseBlock
      title={(
        <Title
          room={room} 
          onResetRoom={onResetRoom}
        />
      )}
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

      <CodeEditorController onChange={onChangeCode} />

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
