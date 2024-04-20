import { Box } from '@mui/material'
import { useTheme } from '@mui/system'
import { FileExtension } from '@remirror/extension-file'
import {
  EditorComponent,
  ReactComponentExtension,
  Remirror,
  TableExtension,
  useRemirror,
} from '@remirror/react'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
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

interface Props {
  description: string
}

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
const extensions = (): Extensions[] => [
  new HeadingExtension(),
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
  new FontSizeExtension({ defaultSize: '16', unit: 'px' }),
  new StrikeExtension(),
  new TextHighlightExtension(),
  new TextCaseExtension(),
  new SupExtension(),
  new SubExtension(),
  new ShortcutsExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new TaskListExtension(),
]
export default function QuestDescription({ description }: Props) {
  const { manager } = useRemirror({
    extensions: extensions as any,
    stringHandler: 'html',
  })
  const theme = useTheme()

  return (
    <>
      <style>{`.remirror-editor-wrapper { padding: ; }
        .remirror-theme .ProseMirror{
          background-color: ${theme.palette.background.default};
        }
        .ProseMirror:focus {
          outline: none!important;
      }
      .ProseMirror-focused {
        outline: none!important;
      }
      `}</style>

      <Box sx={{ pb: 3, pt: 2 }}>
        <div className='remirror-theme'>
          <Remirror
            manager={manager}
            editable={false}
            initialContent={description ? JSON.parse(description).doc : ''}
          >
            <EditorComponent />
          </Remirror>
        </div>
      </Box>
    </>
  )
}
