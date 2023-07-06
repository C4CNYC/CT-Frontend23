export const MOVE_CURSOR_EVENT = "move-cursor";
export const moveCursorEvent = (data: { detail: { left: boolean } }) =>
  new CustomEvent(MOVE_CURSOR_EVENT, data);
