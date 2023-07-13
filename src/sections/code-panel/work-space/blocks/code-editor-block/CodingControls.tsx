import { memo } from "react";

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

export enum ICodingActonsType {
  symbol = "symbol",
  keyboard = "keyboard",
}
interface Props {
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

export const CodingSymbols = memo(function CodingSymbols({
  symbolsHandler,
}: Props): React.ReactElement {
  const eventHandler = (symbol: string) => {
    window.dispatchEvent(pasteSymbolEvent({ detail: { symbol } }));
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "3px",
        background: "rgba(21, 82, 117, 0.8)",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        width: "calc(100% - 7px)",
        mx: "1px",
        height: "30px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <SymbolBtn
        onClick={() => {
          eventHandler("<");
        }}
      >
        {"<"}
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler(">");
        }}
      >
        {">"}
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler("/");
        }}
      >
        {"/"}
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler("{ }");
        }}
        sx={{ fontSize: "1.2rem", pb: 1 }}
      >
        {"{ }"}
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler(" = ");
        }}
      >
        =
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler(" + ");
        }}
      >
        +
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler('"');
        }}
        sx={{ pt: "10px" }}
      >
        "
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler("'");
        }}
        sx={{ pt: "10px" }}
      >
        '
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler(":");
        }}
        sx={{ pb: "10px" }}
      >
        :
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler(";");
        }}
        sx={{ pb: "10px" }}
      >
        ;
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          eventHandler("");
        }}
      >
        <MdKeyboardHide size="20px" color="#C4C4C4" />
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          symbolsHandler();
        }}
        sx={{
          borderTopRightRadius: "15px",
          background: "rgba(251, 221, 63, .2)",
          "&:hover": {
            background: "rgba(251, 221, 63, .4)",
          },
        }}
      >
        <TbTool size="20px" color="#FBDD3F" />
      </SymbolBtn>
    </Box>
  );
});
export function CodingTools({ symbolsHandler }: Props): React.ReactElement {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "3px",
        background: "rgba(238, 70, 122, 0.5)",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        width: "calc(100% - 7px)",
        height: "30px",
        display: "flex",
        mx: "1px",
        justifyContent: "space-between",
      }}
    >
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
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          window.dispatchEvent(copyPasteEvent({ detail: { type: "select" } }));
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
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        sx={{ pb: "10px" }}
        onClick={() => {
          window.dispatchEvent(moveCursorEvent({ detail: { left: true } }));
        }}
      >
        <MdNavigateBefore size="25px" color="#FFF" />
      </SymbolBtn>
      <SymbolBtn
        sx={{ pb: "10px" }}
        onClick={() => {
          window.dispatchEvent(moveCursorEvent({ detail: { left: false } }));
        }}
      >
        <MdNavigateNext size="25px" color="#FFF" />
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn>
        <RiFilePaper2Fill size="20px" color="#EE467A" />
      </SymbolBtn>
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      {/* <SymbolBtn> */}
      <Box
        sx={{
          display: "flex",
          minWidth: "auto",
          flexGrow: 1,
          justifyContent: "ceter",
          alignItems: "center",
        }}
      >
        <SettingDrawer />
      </Box>
      {/* </SymbolBtn> */}
      <Divider sx={{ borderStyle: "solid" }} orientation="vertical" flexItem />
      <SymbolBtn
        onClick={() => {
          symbolsHandler();
        }}
        sx={{
          borderTopRightRadius: "15px",
          background: "rgba(251, 221, 63, .2)",
          "&:hover": {
            background: "rgba(251, 221, 63, .4)",
          },
        }}
      >
        <TbBraces size="20px" color="#FBDD3F" style={{ width: "25px" }} />
      </SymbolBtn>
    </Box>
  );
}
