import { type MotionStyle } from "framer-motion";

export const DRAW = {
  hidden: () => {
    return {
      pathLength: 0,
      opacity: 0,
      transition: {
        opacity: { duration: 0.2 },
        display: { delay: 0.21 },
      },
    };
  },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;

    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 0.9, bounce: 0 },
        opacity: { delay, duration: 0.01 },
        display: { delay: 0, duration: 0.1 },
      },
    };
  },
};

export const VARIANTS = {
  open: { display: "block" },
  closed: { display: "none" },
};

export const M_DIV_STYLE: MotionStyle = {
  position: "absolute",
  zIndex: 1,
  top: "calc(50% - 100px)",
  left: "calc(50% - 90px)",
  width: "200px",
  height: "200px",
}
