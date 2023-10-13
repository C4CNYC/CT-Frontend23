export const SLIDER_STYLE = {
  color: "#52af77",
  height: "14px",
  pointerEvents: "none !important",
  "& .MuiSlider-thumb": {
    width: "30px",
    height: "30px",
    backgroundColor: "#FFD874",
    backgroundImage: "url(/assets/code-panel/compleate.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "20px",
    "&:hover": {
      pointerEvents: "none !important",
      boxShadow: "none !important",
    },
    "&:not(.MuiSlider-active)": {
      transition: "left .5s ease-in",
    },
  },
  "& .MuiSlider-track": {
    transition: "width .5s ease-in",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#404040",
  },
};

export const getBoxStyles = (isDesktop: boolean) => ({
  width: isDesktop ? "70%" : "100%",
  position: "relative",
  p: isDesktop ? "0" : "10px 0 0 20px",
});
