import { useEffect } from "react";

import { AnimatePresence, m, useAnimationControls } from "framer-motion";
import { useAtom } from "jotai";

import { alpha } from "@mui/material";

import { checkersAnimationAtom } from "./checkers-animation-atom";

export default function CheckersCompleated(): React.ReactElement {
  const [{ activateCompeated }, setAnimation] = useAtom(checkersAnimationAtom);
  const controls = useAnimationControls();
  const draw = {
    hidden: (i: number) => {
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
  const variants = {
    open: { display: "block" },
    closed: { display: "none" },
  };
  useEffect(() => {
    if (activateCompeated) {
      controls.start("visible").then(async () => {
        await controls.start("hidden").then(() => {
          setAnimation((prev) => ({
            ...prev,
            activateCompeated: false,
          }));
        });
      });
    }
  }, [activateCompeated]);
  return (
    <AnimatePresence>
      <m.div
        animate={activateCompeated ? "open" : "closed"}
        variants={variants}
        style={{
          position: "absolute",
          zIndex: 1,
          top: "calc(50% - 100px)",
          left: "calc(50% - 90px)",
          width: "200px",
          height: "200px",
        }}
      >
        <m.svg viewBox="0 0 140 140" initial="hidden" animate={controls}>
          <m.circle
            cx="70"
            cy="70"
            r="60"
            stroke={alpha("#75CF6D", 0.4)}
            variants={draw}
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
            variants={draw}
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
            variants={draw}
            custom={0.7}
          />
        </m.svg>
      </m.div>
    </AnimatePresence>
  );
}
