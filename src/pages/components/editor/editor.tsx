import "remirror/styles/all.css";
import { useEffect, useState } from "react";
import {
  BoldExtension,
  HeadingExtension, ImageExtension,
  ItalicExtension,
  UnderlineExtension,
  BlockquoteExtension,
  CodeBlockExtension,
  CodeExtension,
  ColumnsExtension,
  IframeExtension,
  FontFamilyExtension,
  HorizontalRuleExtension,
  NodeFormattingExtension, TextColorExtension

} from "remirror/extensions";
import {
  BasicFormattingButtonGroup,
  HeadingLevelButtonGroup,
  HistoryButtonGroup,
  useRemirror,
  Remirror,
  Toolbar, ToggleBlockquoteButton, ToggleCodeBlockButton,
  ThemeProvider, ToggleColumnsButton,
  InsertHorizontalRuleButton,
  TextAlignmentButtonGroup, IndentationButtonGroup, EditorComponent
} from "@remirror/react";
import AddIframeButton from "./AddIframeButton";
import AddYoutubeButton from "./AddYoutubeButton";
import FontFamilyButtons from "./FontFamilyButtons";
import TextColorPicker from "./TextColorPicker";
import TablePicker from "./TablePicker";
import { TableComponents, TableExtension } from "@remirror/extension-react-tables";
import { ReactComponentExtension } from "@remirror/extension-react-component";

const extensions = () => [
  new HeadingExtension(),
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
  new ImageExtension({ enableResizing: true }),
  new BlockquoteExtension(),
  new CodeBlockExtension(),
  new CodeExtension(),
  new ColumnsExtension(),
  new IframeExtension(),
  new FontFamilyExtension(),
  new HorizontalRuleExtension(),
  new NodeFormattingExtension(),
  new TextColorExtension(),
  new ReactComponentExtension(),
  new TableExtension()
];

export default function MyEditor(): JSX.Element {
  const { manager, state, setState } = useRemirror({
    extensions,
    stringHandler: "html"
  });

  console.log(state.doc);

  return (
    <ThemeProvider>
      <style>
        {`
          .remirror-theme .ProseMirror:active, .remirror-theme .ProseMirror:focus {
            box-shadow: none;
          }
          .remirror-editor-wrapper { padding: 0; height: 80vh }
          .remirror-theme .ProseMirror {
            height: 90vh;
            box-shadow: none;
          }
          .remirror-menu{
            right: 0;
          }
        `}
      </style>
      <Remirror
        placeholder="Start type here ..."
        manager={manager}
        initialContent={state}
        autoFocus autoRender="end"
        onChange={(parameter) => {
          setState(parameter.state.doc);
        }}>
        <Toolbar style={{
          padding: "15px",
          background: "#f4f5f7",
          overflowX: "visible"
        }}>
          <HistoryButtonGroup />
          <BasicFormattingButtonGroup />
          <HeadingLevelButtonGroup showAll />
          <TextAlignmentButtonGroup />
          <IndentationButtonGroup />
          <FontFamilyButtons />

          <div style={{ height: "30px", display: "flex" }}>
            <ToggleBlockquoteButton />
            <InsertHorizontalRuleButton />
            <ToggleCodeBlockButton lang="html" />
            <ToggleColumnsButton />
            <AddIframeButton />
            <AddYoutubeButton />
            <TextColorPicker />
            <TablePicker />
            <TableComponents />
          </div>

        </Toolbar>
      </Remirror>
    </ThemeProvider>

  );
}
