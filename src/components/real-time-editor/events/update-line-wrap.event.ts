export const UPDATE_LINE_WRAP = "update_line_wrap";
export const updateLineWrap = (data: { detail: { wrap: boolean } }) =>
  new CustomEvent(UPDATE_LINE_WRAP, data);
