import "remirror/styles/all.css";

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
  FontFamilyExtension
} from "remirror/extensions";
import {
  BasicFormattingButtonGroup,
  HeadingLevelButtonGroup,
  HistoryButtonGroup,
  useRemirror,
  Remirror,
  Toolbar, ToggleBlockquoteButton, ToggleCodeBlockButton,
  ThemeProvider, ToggleColumnsButton
} from "@remirror/react";
import AddIframeButton from "./AddIframeButton";
import AddYoutubeButton from "./AddYoutubeButton";
import FontFamilyButtons from "./FontFamilyButtons";

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
  // new EmojiExtension(), need fix

];

export default function MyEditor() {
  const { manager, state, setState } = useRemirror({
    extensions,
    stringHandler: "html"
  });

  console.log(state);
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
          background: "#f4f5f7"
        }}>
          <HistoryButtonGroup />
          <BasicFormattingButtonGroup />
          <HeadingLevelButtonGroup showAll />
          <ToggleBlockquoteButton />
          <ToggleCodeBlockButton lang="html" />
          <ToggleColumnsButton />
          <AddIframeButton />
          <AddYoutubeButton />
          <FontFamilyButtons />
        </Toolbar>
      </Remirror>
    </ThemeProvider>

  );
}
