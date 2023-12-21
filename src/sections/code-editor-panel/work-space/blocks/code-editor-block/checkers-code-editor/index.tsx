import { type FC, useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, m } from "framer-motion";

import { Box } from "@mui/material";
import { Stack } from "@mui/system";

import { Iconify } from "@components";

import CheckersCompleated from "./checkers-compleated";
import CheckersMenu from "./checkers-menu";

import { type IValidationMap } from "src/utils/validationMaping";
import { useSelector } from "src/redux/store";
import { setNextStepAble } from "src/redux/slices/code-panel-global";
import { setIsTextOpened, setIsVisible } from "src/redux/slices/checkers-animation";

import {
  BOX_SX,
  ICONIFY_SX,
  CHECKERS_ANIMATION,
  getStackSx,
  M_DIV_STYLE
} from "./constants";

interface ICheckers {
  checkers: IValidationMap[];
}

const Checkers: FC<ICheckers> = ({ checkers }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.checkersAnimation.isVisible);
  const isTextOpened = useSelector((state) => state.checkersAnimation.isTextOpened);
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden);
  const nextStepAble = useSelector((state) => state.codePanelGlobal.nextStepAble);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleCollaps = (): void => {
    if (isVisible) {
      if (isTextOpened) {
        dispatch(setIsTextOpened(false))
        const id = setTimeout(() => {
          dispatch(setIsVisible(false))
        }, 500);
        setTimeoutId(id);
      } else {
        dispatch(setIsVisible(false))
      }
    } else {
      dispatch(setIsVisible(true))
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

    dispatch(setNextStepAble(allPased))
  }, [checkers]);

  const stackSx = useMemo(() => getStackSx(isBrowserHidden), [isBrowserHidden])

  return (
    <>
      <CheckersCompleated />

      <Stack sx={stackSx}>
        <Box sx={BOX_SX}>
          <Iconify
            sx={ICONIFY_SX}
            icon={isVisible ? "ic:baseline-remove-red-eye" : "mdi:eye-off"}
            width="22px"
            onClick={handleCollaps}
          />
        </Box>

        <AnimatePresence>
          <m.div
            initial={false}
            animate={isVisible ? "open" : "closed"}
            variants={CHECKERS_ANIMATION}
            style={M_DIV_STYLE}
          >
            <CheckersMenu checkers={checkers} />
          </m.div>
        </AnimatePresence>
      </Stack>
    </>
  );
};

export default Checkers;
