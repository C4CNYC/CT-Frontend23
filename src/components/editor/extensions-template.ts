import { FileExtension } from "@remirror/extension-file";
import { ReactComponentExtension } from "@remirror/react";
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
  TableExtension,
  TaskListExtension,
  TextCaseExtension,
  TextColorExtension,
  TextHighlightExtension,
  UnderlineExtension,
  WhitespaceExtension,
} from "remirror/extensions";
import data from "svgmoji/emoji.json";

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

export const extensions = (): Extensions[] => [
  new HeadingExtension(),
  new BoldExtension(),
  new ItalicExtension(),
  new UnderlineExtension(),
  //   new ImageExtension({ enableResizing: true, uploadHandler }),
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
  new EmojiExtension({ data, moji: "noto" }),
];
