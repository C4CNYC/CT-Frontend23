import { type FC, useEffect, useState, useCallback, useMemo } from "react";

import { Button, Box, useTheme } from "@mui/material";

import NavigationElement from "./navigation-element";
import NavigationSpeedDial from "./navigation-speed-dial";
import { stylesNext, stylesPrev, stylesSkip } from "./styles";
import { BOX_SX, getNestedBoxSx } from "./constants";

export enum BtnType {
  next = "NEXT",
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
  const stylePrev = useMemo(stylesPrev, []);
  const styleNext = useMemo(() => stylesNext(btnNext), [btnNext])

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
    </Box>
  );
};

export default Navigation;
