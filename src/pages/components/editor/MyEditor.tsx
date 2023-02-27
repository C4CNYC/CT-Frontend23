import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
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
import React from "react";
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
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import { useUpdateLessonContentMutation } from "src/redux/services/manager/lesson-content-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
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
  lessonId: string;
  data?: ILessonContent & BaseResponseInterface;
}

export default function MyEditor({
  lessonId,
  data,
}: Props): React.ReactElement {
  const [updateLessonContent] = useUpdateLessonContentMutation();
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
    content: data?.body ? JSON.parse(data?.body) : "",
    stringHandler: "html",
  });

  const saveContent = async (): Promise<void> => {
    updateLessonContent({
      lessonId,
      body: JSON.stringify(state),
    });
  };

  return (
    <ThemeProvider>
      <style>
        {`
          .remirror-theme .ProseMirror:active, .remirror-theme .ProseMirror:focus {
            scrollbar-width: none;
            box-shadow: none;
          }
          .remirror-editor-wrapper { padding: 0; height: 80vh }
          .remirror-theme .ProseMirror {
            scrollbar-width: none;
            box-shadow: none;
          }
          .remirror-menu{
            right: 0;
          }
          .css-19j3oe6-MuiStack-root {
            overflow-x: visible !important;
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
        placeholder="Start type here ..."
        manager={manager}
        initialContent={state}
        autoFocus
        autoRender="end"
        onChange={(parameter) => {
          setState(parameter.state.doc);
        }}
      >
        <Toolbar
          style={{
            padding: "15px",
            background: "#f4f5f7",
            overflowX: "scroll",
            overflowY: "visible",
            scrollbarWidth: "none",
            position: "sticky",
            zIndex: 99,
            top: 0,
          }}
        >
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
      </Remirror>
    </ThemeProvider>
  );
}
