export const UPDATE_EDITOR_AUTO_COMPLETE = 'update_editor_auto_complete'
export const updateEditorAutoComplete = (data: { detail: { isAutoComplete: boolean } }) =>
  new CustomEvent(UPDATE_EDITOR_AUTO_COMPLETE, data)
