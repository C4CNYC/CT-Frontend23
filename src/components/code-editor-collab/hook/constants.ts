export const BASIC_SETUP = {
  highlightActiveLineGutter: true,
  foldGutter: true,
  dropCursor: true,
  allowMultipleSelections: true,
  indentOnInput: true,
  bracketMatching: true,
  closeBrackets: true,
  autocompletion: true,
  rectangularSelection: true,
  crosshairCursor: true,
  highlightActiveLine: true,
  highlightSelectionMatches: true,
  closeBracketsKeymap: true,
  searchKeymap: true,
  foldKeymap: true,
  completionKeymap: true,
  lintKeymap: true,
}

// Owner can:
// - see all files
// - read code
// - change code
// - add/delete files

// Watcher can:
// - read code
// - see only active file

// SubOwner can:
// - see all files
// - read code
// - change code

export enum EditorMode {
  Owner = "owner",
  Watcher = "watcher",
  SubOwner = "subOwner"
}

export enum Extensions {
  Css = "css",
  Html = "html",
  Js = "js"
}

export const DEFAULT_FILE ={
  id:  "index.html",
  name: "index.html"
};
export const MIN_FILE_LIST_LENGTH = 1;

export const getEmptyFileManagement = () => ({
  activeFile: DEFAULT_FILE,
  files: [DEFAULT_FILE],
  filesInLayout: [DEFAULT_FILE]
})
