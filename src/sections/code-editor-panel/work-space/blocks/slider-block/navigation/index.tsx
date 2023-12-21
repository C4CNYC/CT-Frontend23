import { type FC, useCallback, useEffect, useMemo, useState } from "react";

import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

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
  next = "btn_group_next",
  compleated = "btn_group_you_did_it",
  coding = "btn_group_lets_coding",
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
  const styleNext = useMemo(() => stylesNext(btnNext), [btnNext]);
  const tooltipWrapperSx = useMemo(() => getTooltipWrapperSx(theme), [theme]);
  const translate = useTranslate();

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
                {translate("btn_group_tooltip")}
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
                  {translate("btn_group_skip")}
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
