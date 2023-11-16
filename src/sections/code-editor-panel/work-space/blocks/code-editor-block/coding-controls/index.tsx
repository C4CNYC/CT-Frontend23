import { type FC, memo } from "react";

import { AiOutlineCopy } from "react-icons/ai";
import { BsClipboard } from "react-icons/bs";
import {
  MdKeyboardHide,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { RiFilePaper2Fill, RiShareForwardFill } from "react-icons/ri";
import { TbBoxMargin, TbBraces, TbTool } from "react-icons/tb";

import { Box, Button, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { moveCursorEvent, pasteSymbolEvent, undoRedoEvent } from "@components";
import SettingDrawer from "@sections/code-panel/top-bar/nav-bar/options/setting-drawer";
import { copyPasteEvent } from "src/components/real-time-editor/events/copy-paste";

import {
  BOTTOM_BOX,
  BRACES_WIDTH,
  CODING_SYMBOLS_BOX_SX,
  DIVIDER_SX,
  SYMBOL_BTN_BRACKETS_SX,
  SYMBOL_BTN_PB,
  SYMBOL_BTN_PT,
  SYMBOL_BTN_TOOL,
} from "./constants";

export enum ICodingActonsType {
  symbol = "symbol",
  keyboard = "keyboard",
}

interface CodingSymbolsProps {
  symbolsHandler: () => void;
}

export const SymbolBtn = styled(Button)({
  minWidth: "auto",
  flexGrow: 1,
  borderRadius: "0",
  borderTopRightRadius: "0",
  fontSize: "1.3rem",
  color: "#43D4DD",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

// eslint-disable-next-line react/display-name
export const CodingSymbols: FC<CodingSymbolsProps> = memo(
  ({ symbolsHandler }: CodingSymbolsProps) => {
    const eventHandler = (symbol: string) => {
      window.dispatchEvent(pasteSymbolEvent({ detail: { symbol } }));
    };

    return (
      <Box sx={CODING_SYMBOLS_BOX_SX}>
        <SymbolBtn
          onClick={() => {
            eventHandler("<");
          }}
        >
          {"<"}
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler(">");
          }}
        >
          {">"}
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler("/");
          }}
        >
          {"/"}
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler("{ }");
          }}
          sx={SYMBOL_BTN_BRACKETS_SX}
        >
          {"{ }"}
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler(" = ");
          }}
        >
          =
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler(" + ");
          }}
        >
          +
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler('"');
          }}
          sx={SYMBOL_BTN_PT}
        >
          "
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler("'");
          }}
          sx={SYMBOL_BTN_PT}
        >
          '
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler(":");
          }}
          sx={SYMBOL_BTN_PB}
        >
          :
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler(";");
          }}
          sx={SYMBOL_BTN_PB}
        >
          ;
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            eventHandler("");
          }}
        >
          <MdKeyboardHide size="20px" color="#C4C4C4" />
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            symbolsHandler();
          }}
          sx={SYMBOL_BTN_TOOL}
        >
          <TbTool size="20px" color="#FBDD3F" />
        </SymbolBtn>
      </Box>
    );
  }
);
// eslint-disable-next-line react/display-name
export const CodingTools: FC<CodingSymbolsProps> = memo(
  ({ symbolsHandler }: CodingSymbolsProps) => {
    return (
      <Box sx={CODING_SYMBOLS_BOX_SX}>
        <SymbolBtn
          onClick={() => {
            window.dispatchEvent(undoRedoEvent({ detail: { type: "undo" } }));
          }}
        >
          <RiShareForwardFill
            size="20px"
            color="#FFF"
            style={{
              transform: "rotateZ(180deg) rotateX(180deg)",
            }}
          />
        </SymbolBtn>

        <SymbolBtn
          onClick={() => {
            window.dispatchEvent(undoRedoEvent({ detail: { type: "redo" } }));
          }}
        >
          <RiShareForwardFill size="20px" color="#FFF" />
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            window.dispatchEvent(
              copyPasteEvent({ detail: { type: "select" } })
            );
          }}
        >
          <TbBoxMargin size="20px" color="#FFF" />
        </SymbolBtn>

        <SymbolBtn
          onClick={() => {
            window.dispatchEvent(copyPasteEvent({ detail: { type: "copy" } }));
          }}
        >
          <AiOutlineCopy size="18px" color="#FFF" />
        </SymbolBtn>

        <SymbolBtn
          onClick={() => {
            window.dispatchEvent(copyPasteEvent({ detail: { type: "paste" } }));
          }}
        >
          <BsClipboard size="16px" color="#FFF" />
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          sx={SYMBOL_BTN_PB}
          onClick={() => {
            window.dispatchEvent(moveCursorEvent({ detail: { left: true } }));
          }}
        >
          <MdNavigateBefore size="25px" color="#FFF" />
        </SymbolBtn>

        <SymbolBtn
          sx={SYMBOL_BTN_PB}
          onClick={() => {
            window.dispatchEvent(moveCursorEvent({ detail: { left: false } }));
          }}
        >
          <MdNavigateNext size="25px" color="#FFF" />
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn>
          <RiFilePaper2Fill size="20px" color="#EE467A" />
        </SymbolBtn>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <Box sx={BOTTOM_BOX}>
          <SettingDrawer />
        </Box>

        <Divider sx={DIVIDER_SX} orientation="vertical" flexItem />

        <SymbolBtn
          onClick={() => {
            symbolsHandler();
          }}
          sx={SYMBOL_BTN_TOOL}
        >
          <TbBraces size="20px" color="#FBDD3F" style={BRACES_WIDTH} />
        </SymbolBtn>
      </Box>
    );
  }
);
