import { type SxProps } from "@mui/material"

export const BOX_HEIGHT = 276;
export const BOX_WIDTH = 355;

export default {
  getBoxSx: (background: string): SxProps => ({
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    borderRadius: "15px",
    border: "1px solid black",
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    position: "relative",
    overflow: "hidden",
    "& .code-editor-wrapper": {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      overflowY: "auto",
      background,
      "& .cm-editor": {
        paddingTop: "26px",
        fontSize: "18px",
        background,
        minHeight: "274px !important",
        "& .cm-gutter, .cm-activeLineGutter": {
          background,
          color: "rgb(248, 248, 242)"
        },
        "& .cm-activeLine": {
          background,
          color: "rgb(248, 248, 242)"
        }
      }
    },
  }),
  getHeaderSx: (background: string): SxProps => ({
    background,
    height: "28px",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  }),
  AVATAR_SX: {
    width: "20px",
    height: "20px"
  },
  DRAG_INDICATOR_SX: {
    marginLeft: "4px",
    cursor: "grab",
    color: "rgba(240, 238, 238, 0.50)",
    marginRight: "4px",
    "&:focus": {
      outline: "none!important"
    }
  },
  TYP_NAME_SX: {
    color: "#FFF",
    fontSize: "16px",
    marginLeft: "10px"
  },
  CLOSE_ICON_SX: {
    color: "#EAEAEB",
    marginRight: "12px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  OPEN_CODE_ICON: {
    height: "100%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  },
  OPEN_CODE_DISABLED: {
    "& path": {
      fill: "rgba(255, 255, 255, .3)"
    },
    cursor: "not-allowed"
  }
}
