export const UPDATE_FONT_SIZE = "update-font-size";
export const updateFontSize = (data: { detail: { size: number } }) =>
  new CustomEvent(UPDATE_FONT_SIZE, data);
