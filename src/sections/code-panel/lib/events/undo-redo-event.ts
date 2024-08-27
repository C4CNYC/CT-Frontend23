export const UNDO_REDO_EVENT = 'undo-redo-event'
export const undoRedoEvent = (data: { detail: { type: string } }) =>
  new CustomEvent(UNDO_REDO_EVENT, data)

  export function UndoInitiate() {
      window.dispatchEvent(new CustomEvent(UNDO_REDO_EVENT, { detail: 'undo'  }))
    } 
  
  export function RedoInitiate() { 
      window.dispatchEvent(new CustomEvent(UNDO_REDO_EVENT, { detail: 'redo'  }))
    } 