import { Divider } from "@mui/material";
import { height, Stack } from "@mui/system";
import { FileExtension } from "@remirror/extension-file";
import { ReactComponentExtension } from "@remirror/extension-react-component";
import {
  TableComponents,
  TableExtension,
} from "@remirror/extension-react-tables";
import {
  BasicFormattingButtonGroup,
  CalloutTypeButtonGroup,
  CommandButtonGroup,
  DecreaseFontSizeButton,
  FloatingToolbar,
  HeadingLevelButtonGroup,
  HistoryButtonGroup,
  IncreaseFontSizeButton,
  IndentationButtonGroup,
  InsertHorizontalRuleButton,
  Remirror,
  TextAlignmentButtonGroup,
  ThemeProvider,
  ToggleBlockquoteButton,
  ToggleBulletListButton,
  ToggleCodeBlockButton,
  ToggleColumnsButton,
  ToggleOrderedListButton,
  ToggleStrikeButton,
  ToggleSubscriptButton,
  ToggleSuperscriptButton,
  ToggleTaskListButton,
  Toolbar,
  useRemirror,
} from "@remirror/react";
import { useS3Upload } from "next-s3-upload";
import React, { useEffect } from "react";
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
  ImageAttributes,
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
import SaveButton from "./SaveButton";
import {
  AddIframeButton,
  AddYoutubeButton,
  FontFamilyButtons,
  FontSizeButtons,
  TablePicker,
  TextBgColorPicker,
  TextCaseSelect,
  TextColorPicker,
} from "./toolbars";

import jsx from "refractor/lang/jsx.js";
import typescript from "refractor/lang/typescript.js";
import { isJson } from "src/utils/isJson";

interface FileWithProgress {
  file: File;
  progress: SetProgress;
}

declare type SetProgress = (progress: number) => void;

export declare type DelayedPromiseCreator<Value> = (
  props: unknown
) => Promise<Value>;
declare type DelayedImage = DelayedPromiseCreator<ImageAttributes>;

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

interface Props {
  editable?: boolean;
  multimediaValue: string;
  setMultimediaValue?: (value: string) => void;
  onSubmit?: () => void;
}

export default function MyEditor({
  editable = true,
  onSubmit,
  multimediaValue,
  setMultimediaValue,
}: Props): React.ReactElement {
  const { uploadToS3 } = useS3Upload();
  const extensions = (): Extensions[] => [
    new HeadingExtension(),
    new BoldExtension({}),
    new ItalicExtension(),
    new UnderlineExtension(),
    new ImageExtension({ enableResizing: true, uploadHandler }),
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

  const uploadHandler = (files: FileWithProgress[]): DelayedImage[] => {
    let completed = 0;
    const promises: Array<DelayedPromiseCreator<ImageAttributes>> = [];

    for (const { file, progress } of files) {
      promises.push(
        async () =>
          await new Promise<ImageAttributes>((resolve, reject) => {
            completed += 1;
            uploadToS3(file).then(({ url, key }) => {
              progress(completed / files.length);
              resolve({ src: url, fileName: key });
            });
          })
      );
    }

    return promises;
  };

  const { manager, state, setState } = useRemirror({
    extensions,
    content: isJson(multimediaValue) ? JSON.parse(multimediaValue)?.doc : "",
    stringHandler: "html",
  });

  useEffect(() => {
    if (!editable) {
      setState(
        isJson(multimediaValue) ? JSON.parse(multimediaValue) : multimediaValue
      );
    }
  }, [multimediaValue]);

  const saveContent = async (): Promise<void> => {
    if (onSubmit) onSubmit();
  };

  console.log({ height });

  return (
    <ThemeProvider>
      <style>
        {`
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
            overflow: hidden;
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
          
        `}
      </style>
      <Remirror
        editable={editable}
        placeholder="Start type here ..."
        manager={manager}
        state={state}
        // initialContent={state}
        autoFocus
        autoRender="end"
        onChange={(parameter) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          setState(parameter.state);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (setMultimediaValue) setMultimediaValue(parameter.state);
        }}
      >
        {editable ? (
          <>
            <Toolbar
              style={{
                position: "sticky",
                zIndex: 999,
                top: 0,
                padding: "15px",
                overflowX: "scroll",
                overflowY: "scroll",
                scrollbarWidth: "none",
                borderBottom: "1px solid #cbcbcb",
              }}
            >
              <Stack flexDirection="row" sx={{ flexWrap: "wrap", gap: "10px" }}>
                <HistoryButtonGroup />
                <HeadingLevelButtonGroup showAll />
                <IndentationButtonGroup />
                <CalloutTypeButtonGroup />

                <CommandButtonGroup>
                  <ToggleBulletListButton />
                  <ToggleOrderedListButton />
                  <ToggleTaskListButton />
                </CommandButtonGroup>

                <TextColorPicker />
                <TextBgColorPicker />

                <div style={{ height: "30px", display: "flex" }}>
                  <ToggleBlockquoteButton />
                  <InsertHorizontalRuleButton />
                  <ToggleCodeBlockButton lang="html" />
                  <ToggleColumnsButton />

                  <AddIframeButton />
                  <AddYoutubeButton />
                  <TablePicker />
                  <TableComponents />
                </div>
              </Stack>

              <SaveButton onClick={saveContent} />
            </Toolbar>
            <FloatingToolbar
              sx={{
                "&>div": {
                  borderRadius: "5px",
                  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
              style={{
                zIndex: 9999999,
                padding: 10,
              }}
            >
              <Stack
                borderRadius="5px"
                display="flex"
                flexDirection="row"
                p="5px 10px"
                alignItems="center"
                alignContent="center"
              >
                <BasicFormattingButtonGroup />
                <Divider
                  sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
                  orientation="vertical"
                  flexItem
                />
                <CommandButtonGroup>
                  <DecreaseFontSizeButton />
                  <FontSizeButtons />
                  <IncreaseFontSizeButton />
                </CommandButtonGroup>
                <Divider
                  sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
                  orientation="vertical"
                  flexItem
                />
                <Toolbar>
                  <ToggleSuperscriptButton />
                  <ToggleSubscriptButton />
                  <TextCaseSelect />
                </Toolbar>
                <Divider
                  sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
                  orientation="vertical"
                  flexItem
                />
                <ToggleStrikeButton />
                <Divider
                  sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
                  orientation="vertical"
                  flexItem
                />
                <TextAlignmentButtonGroup />
                <Divider
                  sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
                  orientation="vertical"
                  flexItem
                />
                <FontFamilyButtons />
              </Stack>
            </FloatingToolbar>
          </>
        ) : null}
      </Remirror>
    </ThemeProvider>
  );
}
