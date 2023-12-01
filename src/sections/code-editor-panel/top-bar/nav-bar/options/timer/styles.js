import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    width: "320px",
    height: "230px",
    padding: "15px 20px",
    border: "3px solid #43D4DD",
    borderRadius: "10px",
  },
  container: {
    height: "100%",
  },
  inputNumber: {
    width: "112px",
    height: "112px",
    border: "1px solid #000000",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "& input": {
      fontSize: "70px",
      lineHeight: "75px",
      padding: 0,
      width: "75px",
      height: "75px",
      borderBottom: "1px solid #000000",
      textAlign: "center",
      caretColor: "#C4C4C4",
      color: "#364954",
    },
  },
  textHint: {
    fontSize: "26px",
    lineHeight: "26px",
    color: "#364954",
    marginTop: "10px",
  },
  closeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "32px",
    height: "32px",
    color: "#808080",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "& svg": {
      stroke: "#808080",
      strokeWidth: "2",
      fontSize: "24px",
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "&:hover": {
      background: "#ffffff",
    },
  },
  finishText: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "30px",
    color: "#364954",
  },
  gif: {
    width: "184px",
    height: "156px",
    marginTop: "-30px",
  },
  menuButton: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "&:hover": {
      backgroundColor: "transparent",
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "& .MuiIconButton-label": {
      background: (props) =>
        props.mobile ? "#fff" : "rgba(196, 196, 196, 0.15)",
      borderRadius: 40,
      width: 41,
      height: 37,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "&:hover": {
        backgroundColor: "#34323226",
      },
    },
  },
}));
