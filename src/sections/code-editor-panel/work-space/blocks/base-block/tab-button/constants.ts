export const getBoxStyles = (orientation: string) => ({
  position: "absolute",
  top: "55%",
  right: orientation === "right" ? "0" : "",
  left: orientation === "left" ? "0" : "",
  width: "40px",
  height: "35px",
  borderRadius:
    orientation === "left" ? "0 20px 20px 0" : "20px 0 0 20px",
  background: "#EE467A33",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SWIPE_RIGHT_STYLE = { transform: "rotateZ(20deg)" };
export const SWIPE_LEFT_STYLE = { transform: "rotateZ(-20deg)" };
