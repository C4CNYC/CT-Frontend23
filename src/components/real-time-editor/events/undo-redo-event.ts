export const UNDO_REDO_EVENT = "undo-redo-event";
export const undoRedoEvent = (data: { detail: { type: string } }) =>
  new CustomEvent(UNDO_REDO_EVENT, data);
