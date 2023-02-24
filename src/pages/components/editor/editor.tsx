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
    content: "<p><u>Hello</u> there <b>friend</b> and <em>partner</em>.</p>",
    stringHandler: "html"
  });

  console.log(state);
  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        initialContent={state}
        autoFocus autoRender="end"
        onChange={(parameter) => {
          setState(parameter.state.doc);
        }}>
        <Toolbar>
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
