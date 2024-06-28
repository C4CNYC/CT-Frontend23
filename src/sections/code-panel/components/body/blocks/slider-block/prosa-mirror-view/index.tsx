import { useMemo, type FC } from 'react'

import { Typography } from '@mui/material'
import { FileExtension } from '@remirror/extension-file'
import {
  Remirror,
  ThemeProvider,
  useRemirror,
  ReactComponentExtension,
  TableExtension,
} from '@remirror/react'
import jsx from 'refractor/lang/jsx.js'
import typescript from 'refractor/lang/typescript.js'
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
} from 'remirror/extensions'
import 'remirror/styles/all.css'

import { isJson, voidFunction } from '@/utils'

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
  | EmojiExtension

interface ProsaMirrorViewProps {
  multimediaValue: string
  title?: string
  lessonType?: string | undefined
  stepBgColor?: string
}

const extensions = (): Extensions[] => [
  new HeadingExtension({}),
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
  new ImageExtension({ enableResizing: false }),
  new BlockquoteExtension(),
  new CodeBlockExtension({
    defaultLanguage: 'js',
    supportedLanguages: [typescript, jsx],
  }),
  new CodeExtension(),
  new ColumnsExtension({}),
  //@ts-ignore
  new IframeExtension({}),
  new FontFamilyExtension(),
  new HorizontalRuleExtension({}),
  new NodeFormattingExtension({}),
  new TextColorExtension({}),
  new ReactComponentExtension({}),
  new TableExtension({}),
  new FileExtension({}),
  new CalloutExtension({}),
  new LinkExtension({ autoLink: true }),
  new FontSizeExtension({ defaultSize: '16', unit: 'px' }),
  new StrikeExtension(),
  new TextHighlightExtension({}),
  new TextCaseExtension({}),
  new SupExtension(),
  new SubExtension(),
  new ShortcutsExtension(),
  new BulletListExtension({}),
  new OrderedListExtension(),
  new TaskListExtension(),
]

const ProsaMirrorView: FC<ProsaMirrorViewProps> = ({
  multimediaValue,
  title,
  lessonType,
  stepBgColor,
}) => {
  const { manager, state } = useRemirror({
    extensions: extensions as any, // @ToDo,
    content: isJson(multimediaValue) ? JSON.parse(multimediaValue)?.doc : '',
    stringHandler: 'html',
  })

  const styles = useMemo(() => getRemirrorStyles(stepBgColor ?? '#F6F9FC'), [stepBgColor])

  return (
    <ThemeProvider>
      <style>{styles}</style>
      {title && lessonType === 'open_project' && <Typography variant='h1'>{title}</Typography>}
      <Remirror
        editable={false}
        manager={manager}
        state={state}
        autoFocus
        autoRender='end'
        onChange={voidFunction}
      ></Remirror>
    </ThemeProvider>
  )
}

const getRemirrorStyles = (stepBgColor: string) => `
.remirror-theme .ProseMirror:active, .remirror-theme .ProseMirror:focus {
  box-shadow: none;
}
.remirror-editor-wrapper {
  padding: 0;
  background-color: ${stepBgColor};
}
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

.remirror-theme code {
  background-color: #f5f4f4;
  border: .1rem solid rgba(0, 0, 0, .1);
  border-radius: 0.4rem;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 100%;
  padding: 0.1rem;
  vertical-align: middle;
}

`

export default ProsaMirrorView
