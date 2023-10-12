import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, m, useAnimationControls } from "framer-motion";

import { alpha } from "@mui/material";
import { useSelector } from "src/redux/store";
import { setIsActivateCompeated } from "src/redux/slices/checkers-animation";

import {
  DRAW,
  M_DIV_STYLE,
  VARIANTS
} from "./constants"

const CheckersCompleated: FC = () => {
  const dispatch = useDispatch();
  const isActivateCompeated = useSelector(
    (state) => state.checkersAnimation.isActivateCompeated
  );

  const controls = useAnimationControls();

  useEffect(() => {
    if (isActivateCompeated) {
      controls.start("visible").then(async () => {
        await controls.start("hidden").then(() => {
          dispatch(setIsActivateCompeated(false))
        });
      });
    }
  }, [isActivateCompeated, dispatch]);

  return (
    <AnimatePresence>
      <m.div
        animate={isActivateCompeated ? "open" : "closed"}
        variants={VARIANTS}
        style={M_DIV_STYLE}
      >
        <m.svg viewBox="0 0 140 140" initial="hidden" animate={controls}>
          <m.circle
            cx="70"
            cy="70"
            r="60"
            stroke={alpha("#75CF6D", 0.4)}
            variants={DRAW}
            strokeWidth={16}
            fillOpacity={0}
            custom={0.1}
          />
          <m.line
            x1="50"
            y1="70"
            x2="68"
            y2="100"
            stroke="#75CF6D"
            strokeLinecap="round"
            strokeWidth={13}
            variants={DRAW}
            custom={0.1}
          />
          <m.line
            x1="68"
            y1="100"
            x2="90"
            y2="40"
            strokeLinecap="round"
            stroke="#75CF6D"
            strokeWidth={13}
            variants={DRAW}
            custom={0.7}
          />
        </m.svg>
      </m.div>
    </AnimatePresence>
  );
}

export default CheckersCompleated;
