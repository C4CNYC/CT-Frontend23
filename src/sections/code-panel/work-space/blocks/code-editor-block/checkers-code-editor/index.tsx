import { useEffect, useState } from "react";

import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { AnimatePresence, m } from "framer-motion";
import { useAtom } from "jotai";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";

import { Iconify } from "@components";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { IValidationMap } from "src/utils/validationMaping";

import CheckersCompleated from "./CheckersCompleated";
import CheckersMenu from "./CheckersMenu";
import { checkersAnimationAtom } from "./checkers-animation-atom";

interface ICheckers {
  checkers: IValidationMap[];
}

const Checkers = ({ checkers }: ICheckers): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [
    { nextStepAble, isBrowserHidden, isInstructionsHidden },
    setGlobalAtom,
  ] = useAtom(globalCodePanelAtom);
  const [{ visible, openText }, setAnimation] = useAtom(checkersAnimationAtom);
  const [timeoutId, setTimeoutId] = useState<TimeoutId | null>(null);
  const handleCollaps = (): void => {
    if (visible) {
      if (openText) {
        setAnimation((prev) => ({
          ...prev,
          openText: false,
        }));
        const id = setTimeout(() => {
          setAnimation((prev) => ({
            ...prev,
            visible: false,
          }));
        }, 500);
        setTimeoutId(id);
      } else {
        setAnimation((prev) => ({
          ...prev,
          visible: false,
        }));
      }
    } else {
      setAnimation((prev) => ({
        ...prev,
        visible: true,
      }));
    }
  };
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  useEffect(() => {
    const allPased = checkers.reduce((prev, curr) => prev && curr.valid, true);
    if (allPased === nextStepAble) return;
    setGlobalAtom((prev) => ({
      ...prev,
      nextStepAble: allPased,
    }));
  }, [checkers]);

  const checkersAnimation = {
    open: {
      height: "auto",
      opacity: 1,
    },
    closed: {
      height: "0px",
    },
  };
  return (
    <>
      <CheckersCompleated />
      <Stack
        sx={{
          top: isBrowserHidden ? "40px" : "38px",
          right: isBrowserHidden ? "45px" : "15px",
          position: "absolute",
          zIndex: 300,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            top: "8px",
            right: "7px",
            zIndex: 301,
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Iconify
            sx={{ "& path": { fill: "#000000" } }}
            icon={visible ? "ic:baseline-remove-red-eye" : "mdi:eye-off"}
            width="22px"
            onClick={handleCollaps}
          />
        </Box>
        <AnimatePresence>
          <m.div
            initial={false}
            animate={visible ? "open" : "closed"}
            variants={checkersAnimation}
            style={{
              background: "#155275CC",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <CheckersMenu checkers={checkers} />
          </m.div>
        </AnimatePresence>
      </Stack>
    </>
  );
};

export default Checkers;
