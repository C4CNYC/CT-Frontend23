import { SxProps } from "@mui/system";
import { type ReactNode } from "react";

export const PAPER_SX = { py: 2, px: 3 };
export const ICON_BTN_SX = { mt: -2, mr: "-20px" };
export const BOX_CONTENT_SX = { maxWidth: "300px", py: 1 };
export const BTN_BACK_SX = { mr: 2 };
export const NEXT_BTN_SX = { ml: 2 };

export const getBoxActionsSx = (i: number): SxProps => ({
  display: "flex",
  justifyContent: i === 0 ? "flex-end" : "space-between",
  alignItems: "center",
})

export const getBoxSx = (title: ReactNode): SxProps => ({
  display: "flex",
  justifyContent: title != null ? "space-between" : "flex-end",
  alignItems: "center",
  width: "100%",
})