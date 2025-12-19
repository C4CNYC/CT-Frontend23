import { BasicSetupOptions } from '@uiw/codemirror-extensions-basic-setup'

export const BASIC_SETUP: BasicSetupOptions = {
  highlightActiveLineGutter: true,
  foldGutter: false,
  dropCursor: true,
  allowMultipleSelections: true,
  indentOnInput: false,
  bracketMatching: true,
  closeBrackets: false,
  autocompletion: false,
  rectangularSelection: true,
  crosshairCursor: true,
  highlightActiveLine: true,
  highlightSelectionMatches: true,
  closeBracketsKeymap: true,
  searchKeymap: true,
  foldKeymap: false,
  completionKeymap: true,
  lintKeymap: true,
}

export enum Extensions {
  Css = 'css',
  Html = 'html',
  Js = 'js',
  Json = 'json',
  Py = 'py',
  Java = 'java',
  Test = 'test',
  Go = 'go',
  C = 'c',
  Cpp = 'cpp',
}

export const DEFAULT_FILE = {
  id: 'index.html',
  name: 'index.html',
}

export const MIN_FILE_LIST_LENGTH = 1

export const getEmptyFileManagement = () => ({
  activeFile: DEFAULT_FILE,
  files: [DEFAULT_FILE],
  filesInLayout: [DEFAULT_FILE],
})

export enum EffectType {
  SELECTION = 'selection',
  COMMENT = 'comment',
  REMOVE = 'REMOVE',
}
