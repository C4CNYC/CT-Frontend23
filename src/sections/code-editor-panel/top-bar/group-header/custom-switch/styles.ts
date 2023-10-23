import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      width: "54px",
      borderRadius: "20px",
      border: "2px solid #A6A6A6",
      overflow: "hidden",
      height: "22px",
      display: "flex",
      alignItems: "center",
      paddingLeft: 4,
      position: "relative",
      transition: "border-color .3s",
      marginLeft: "14px",
      marginRight: "14px",
      cursor: "pointer",
      "&.is-active": {
        border: "2px solid #0198ED",
        "& $iconWrapper": {
          background: "#0198ED",
          right: "1px",
        },

        "& $subTextActive": {
          opacity: 1
        },

        "& $subTextInactive": {
          opacity: 0
        }
      }
    },
    subTextActive: {
      color: "#0198ED",
      fontFamily: theme.typography.fontFamily,
      fontSize: "7px",
      fontWeight: 500,
      transition: "opacity 150ms",
      opacity: 0
    },
    subTextInactive: {
      color: "#A6A6A6",
      fontFamily: theme.typography.fontFamily,
      fontSize: "7px",
      fontWeight: 600,
      transition: "opacity 150ms",
      marginLeft: "-10px",
      display: "inline-block",
      opacity: 1
    },
    iconWrapper: {
      width: "17px",
      height: "17px",
      background: "#A6A6A6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      transform: "translate(0, -50%)",
      right: "33px",
      transition: "right .3s; background .3s"
    }
  }
})
