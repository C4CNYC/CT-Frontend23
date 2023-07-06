import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  timerButton: {
    width: "130px",
    height: "30px",
    // @ts-expect-error need to rewrite
    background: (props) => props.color,
    borderRadius: "5px",
    border: "none",
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "18px",
    color: "#FFFFFF",
    padding: "0",
    "&:hover": {
      // @ts-expect-error need to rewrite
      background: (props) => props.color,
    },
  },
}));
