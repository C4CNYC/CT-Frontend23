import { type FC, useCallback, useEffect, useMemo, useState } from "react";

import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";

import { BOX_SX, getNestedBoxSx } from "./constants";
import NavigationElement from "./navigation-element";
import NavigationSpeedDial from "./navigation-speed-dial";
import {
  TOOLTIP_CONTENT_SX,
  getTooltipWrapperSx,
  stylesNext,
  stylesPrev,
  stylesSkip,
} from "./styles";

export enum BtnType {
  next = "NEXT 👀",
  compleated = "YOU DID IT 🙌",
  coding = "LET’S GET CODING",
}

interface INavigation {
  hasPrev: boolean;
  canMoveNext: boolean;
  stepHasValidation: boolean;
  onNext: (skip?: boolean) => void;
  onPrev: () => void;
  hasNextStep: boolean;
}

const Navigation: FC<INavigation> = ({
  onNext,
  onPrev,
  hasPrev,
  stepHasValidation,
  canMoveNext,
}) => {
  const theme = useTheme();
  const [btnNext, setBtnNext] = useState<BtnType>(BtnType.next);

  const nestedBox = useMemo(() => getNestedBoxSx(theme), [theme]);
  const tooltipWrapperSx = useMemo(() => getTooltipWrapperSx(theme), [theme]);

  const stylePrev = useMemo(stylesPrev, []);
  const styleNext = useMemo(() => stylesNext(btnNext), [btnNext]);

  const getNextBtnType = useCallback((): void => {
    if (stepHasValidation) {
      if (canMoveNext) {
        setBtnNext(BtnType.compleated);
      } else {
        setBtnNext(BtnType.coding);
      }
    } else {
      setBtnNext(BtnType.next);
    }
  }, [stepHasValidation, canMoveNext]);

  useEffect(() => {
    getNextBtnType();
  }, [getNextBtnType]);

  return (
    <Box sx={BOX_SX}>
      <Box sx={nestedBox}>
        <NavigationElement
          sx={stylePrev}
          disabled={!hasPrev}
          direction="prev"
          onClick={onPrev}
        />

        <NavigationSpeedDial stepHasValidation={stepHasValidation} />

        <Tooltip
          title={
            stepHasValidation && !canMoveNext ? (
              <Typography sx={TOOLTIP_CONTENT_SX}>
                Please complete all tasks to continue (or skip, if available.)
              </Typography>
            ) : (
              ""
            )
          }
          placement="top"
          sx={{
            width: 100,
            textAlign: "center",
          }}
        >
          <Box sx={tooltipWrapperSx}>
            <NavigationElement
              sx={styleNext}
              onClick={() => {
                onNext();
              }}
              backType={btnNext}
            >
              {stepHasValidation && !canMoveNext ? (
                <Button
                  onClick={() => {
                    onNext(true);
                  }}
                  sx={stylesSkip()}
                >
                  SKIP
                </Button>
              ) : null}
            </NavigationElement>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Navigation;
