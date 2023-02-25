import "remirror/styles/all.css";
import { useS3Upload } from "next-s3-upload";
import {
  BoldExtension,
  HeadingExtension,
  ImageExtension,
  ItalicExtension,
  UnderlineExtension,
  BlockquoteExtension,
  CodeBlockExtension,
  CodeExtension,
  ColumnsExtension,
  IframeExtension,
  FontFamilyExtension,
  ImageAttributes,
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

interface FileWithProgress {
  file: File;
  progress: SetProgress;
}

/**
 * Set the progress.
 *
 * @param progress - a value between `0` and `1`.
 */
declare type SetProgress = (progress: number) => void;

export declare type DelayedPromiseCreator<Value> = (props: unknown) => Promise<Value>;
declare type DelayedImage = DelayedPromiseCreator<ImageAttributes>;

export default function MyEditor() {
  const { uploadToS3 } = useS3Upload();
  const extensions = () => [
    new HeadingExtension(),
    new BoldExtension({}),
    new ItalicExtension(),
    new UnderlineExtension(),
    new ImageExtension({ enableResizing: true, uploadHandler }),
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
    stringHandler: "html"
  });

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
