import { type Theme, type SxProps } from "@mui/system";

export const useStyles = (theme: Theme) => ({
  BUTTON_FILE_SX: {
    color: "#e0e3ea",
    textTransform: "none",
    justifyContent: "flex-start" 
  },
  BUTTON_WRAPPER: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  STACK_SX: {
    position: "absolute",
    top: 45,
    left: 0,
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    minHeight: 300,
    maxHeight: 500,
    borderLeft: "none",
    background: "rgba(54,73,84, .9)",
    width: 200,
    zIndex: 1,
    transform: "translate(-100%, 0)",
    transition: "transform .3s",
    boxShadow: "-2px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    padding: "10px 20px",
  },
  STACK_SX_ACTIVE: {
    transform: "translate(0, 0)" 
  },
  FOLDER_BUTTON_SX: {
    position: "absolute",
    top: "5px",
    left: 0,
    background: "#7d8799",
    padding: "5px 10px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    minWidth: "auto",
    zIndex: 1,
    opacity: .3,
    color: "rgb(67, 212, 221)"
  },
  REMOVE_BUTTON: {
    background: theme.palette.error.main,
  },
  REMOVE_FILE_CONTENT: {
    padding: "10px 0px 20px",
    display: "block",
    "& span": {
      fontStyle: "italic"
    }
  },
  devIcon: {
    marginRight: "8px"
  }
})
