export const UPDATE_COLORS = "update-colors";
export const updateColorsEvent = (detail: {
  background: string;
  text: string;
}) => new CustomEvent(UPDATE_COLORS, { detail });
