import { type FC } from "react";

import { FileExtension } from "@remirror/extension-file";
import { ReactComponentExtension } from "@remirror/extension-react-component";
import { TableExtension } from "@remirror/extension-react-tables";
import { Remirror, ThemeProvider, useRemirror } from "@remirror/react";
import jsx from "refractor/lang/jsx.js";
import typescript from "refractor/lang/typescript.js";
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CalloutExtension,
  CodeBlockExtension,
  CodeExtension,
  ColumnsExtension,
  EmojiExtension,
  FontFamilyExtension,
  FontSizeExtension,
  HeadingExtension,
  HorizontalRuleExtension,
  IframeExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  NodeFormattingExtension,
  OrderedListExtension,
  ShortcutsExtension,
  StrikeExtension,
  SubExtension,
  SupExtension,
  TaskListExtension,
  TextCaseExtension,
  TextColorExtension,
  TextHighlightExtension,
  UnderlineExtension,
  WhitespaceExtension,
} from "remirror/extensions";
import "remirror/styles/all.css";

import { isJson, voidFunction } from "@utils";

type Extensions =
  | HeadingExtension
  | BoldExtension
  | ItalicExtension
  | BlockquoteExtension
  | UnderlineExtension
  | ImageExtension
  | CodeBlockExtension
  | CodeExtension
  | ColumnsExtension
  | IframeExtension
  | FontFamilyExtension
  | HorizontalRuleExtension
  | NodeFormattingExtension
  | TextColorExtension
  | ReactComponentExtension
  | TableExtension
  | FileExtension
  | CalloutExtension
  | LinkExtension
  | FontSizeExtension
  | StrikeExtension
  | WhitespaceExtension
  | TextHighlightExtension
  | TextCaseExtension
  | SupExtension
  | SubExtension
  | ShortcutsExtension
  | BulletListExtension
  | OrderedListExtension
  | TaskListExtension
  | EmojiExtension;

interface ProsaMirrorViewProps {
  multimediaValue: string;
}

const extensions = (): Extensions[] => [
  new HeadingExtension(),
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
  new ImageExtension({ enableResizing: false }),
  new BlockquoteExtension(),
  new CodeBlockExtension({
    defaultLanguage: "js",
    supportedLanguages: [typescript, jsx],
  }),
  new CodeExtension(),
  new ColumnsExtension(),
  new IframeExtension(),
  new FontFamilyExtension(),
  new HorizontalRuleExtension(),
  new NodeFormattingExtension(),
  new TextColorExtension(),
  new ReactComponentExtension(),
  new TableExtension(),
  new FileExtension(),
  new CalloutExtension(),
  new LinkExtension({ autoLink: true }),
  new FontSizeExtension({ defaultSize: "16", unit: "px" }),
  new StrikeExtension(),
  new TextHighlightExtension(),
  new TextCaseExtension(),
  new SupExtension(),
  new SubExtension(),
  new ShortcutsExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new TaskListExtension(),
];

const ProsaMirrorView: FC<ProsaMirrorViewProps> = ({
  multimediaValue,
}) => {
  const { manager, state } = useRemirror({
    extensions,
    content: isJson(multimediaValue) ? JSON.parse(multimediaValue)?.doc : "",
    stringHandler: "html",
  });

  return (
    <ThemeProvider>
      <style>
        {STYLES}
      </style>

      <Remirror
        editable={false}
        manager={manager}
        state={state}
        autoFocus
        autoRender="end"
        onChange={voidFunction}
      ></Remirror>
    </ThemeProvider>
  );
}

const STYLES = `
.remirror-theme .ProseMirror:active, .remirror-theme .ProseMirror:focus {
  box-shadow: none;
}
.remirror-editor-wrapper { padding: 0 }
.remirror-theme .ProseMirror {
  scrollbar-width: none;
  box-shadow: none;
}
.remirror-editor.ProseMirror{
  scrollbar-width: none;
  overflow-y: scroll;
}
.ProseMirror.remirror-editor.remirror-a11y-dark{
  overflow-y: scroll;
  scrollbar-width: "none";
   
}
.ProseMirror.remirror-editor.remirror-a11y-dark::-webkit-scrollbar{
  width: 0px
}
.remirror-menu{
  right: 0;
}
.css-19j3oe6-MuiStack-root {
  overflow-x: visible !important;
  overflow-y: visible !important;
}
.remirror-theme ul {
  margin-left: 20px;
}

.remirror-theme ol {
  padding-left: 20px;
}

.remirror-theme [data-task-list] {
  margin-left: 30px;
}

`

export default ProsaMirrorView;
