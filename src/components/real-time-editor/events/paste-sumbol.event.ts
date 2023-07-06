export const PASTE_SYMBOL_EVENT = "paste-symbol-event";
export const pasteSymbolEvent = (data: { detail: { symbol: string } }) =>
  new CustomEvent(PASTE_SYMBOL_EVENT, data);
