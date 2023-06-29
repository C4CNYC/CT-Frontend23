export const COPY_PASTE_EVENT = "copy-paste-event";
export const copyPasteEvent = (data: { detail: { type: string } }) =>
  new CustomEvent(COPY_PASTE_EVENT, data);
