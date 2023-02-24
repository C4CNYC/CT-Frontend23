import "remirror/styles/all.css";

import {
  BoldExtension,
  HeadingExtension, ImageExtension,
  ItalicExtension,
  UnderlineExtension,
  BlockquoteExtension,
  CodeBlockExtension,
  AnnotationExtension

} from "remirror/extensions";
import {
  BasicFormattingButtonGroup,
  HeadingLevelButtonGroup,
  HistoryButtonGroup,
  useRemirror,
  Remirror,
  Toolbar, ToggleBlockquoteButton, ToggleCodeBlockButton,
  ThemeProvider
} from "@remirror/react";
import { ImageAddLineIcon } from "@remirror/react-components/all-icons";
import { prosemirrorNodeToHtml } from "remirror";
import { ADD_ANNOTATION } from "@remirror/messages/dist-types/extension-annotation-messages";

const extensions = () => [
  new HeadingExtension(),
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
  new ImageExtension({ enableResizing: true }),
  new BlockquoteExtension(),
  new CodeBlockExtension()
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
        </Toolbar>
      </Remirror>
    </ThemeProvider>

  )
    ;
}
