import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  box: {
    width: (props) => `${props.width}px`,
    height: (props) => `${props.height}px`,
    transform: "rotate(-90deg) scale(1, -1)",
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "@keyframes circle": {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "0%": { strokeDashoffset: "0px" },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "100%": { strokeDashoffset: "126.92px" },
  },
  circleBefore: {
    strokeDasharray: "126.92px",
    strokeDashoffset: "126.92px",
    stroke: "#0198ED",
    animationName: "$circle",
    animationTimingFunction: "linear",
    animationDelay: (props) => `${props.delay}ms`,
    animationDuration: (props) => `${props.min * 60}s`,
    animationPlayState: (props) => (props.pause ? "paused" : "running"),
  },
  circleAfter: {
    stroke: "#eaeaea",
    strokeDasharray: "126.92px",
    strokeDashoffset: "0px",
  },
  minutesNumber: {
    fontSize: "70px",
    lineHeight: "70px",
    color: "#364954",
  },
}));
