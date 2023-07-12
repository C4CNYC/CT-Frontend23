import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { Box, useTheme } from "@mui/system";

import NavigationElement from "./NavigationElement";
import NavigationSpeedDial from "./NavigationSpeedDial";
import { stylesNext, stylesPrev, stylesSkip } from "./navigation-styles";

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

const Navigation = ({
  onNext,
  onPrev,
  hasPrev,
  stepHasValidation,
  hasNextStep,
  canMoveNext,
}: INavigation): React.ReactElement => {
  const theme = useTheme();
  const [btnNext, setBtnNext] = useState<BtnType>(BtnType.next);
  const getNextBtnType = (): void => {
    if (stepHasValidation) {
      if (canMoveNext) {
        setBtnNext(BtnType.compleated);
      } else {
        setBtnNext(BtnType.coding);
      }
    } else {
      setBtnNext(BtnType.next);
    }
  };
  useEffect(() => {
    getNextBtnType();
  }, [stepHasValidation, canMoveNext]);
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "15px",
        left: "0",
        width: "100%",
        zIndex: "11",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "450px",
          height: "50px",
          width: "100%",
          margin: "0 auto",
          position: "relative",
          [theme.breakpoints.down(450)]: {
            px: "5px",
          },
        }}
      >
        <NavigationElement
          sx={stylesPrev()}
          disabled={!hasPrev}
          direction="prev"
          onClick={onPrev}
        />
        <NavigationSpeedDial stepHasValidation={stepHasValidation} />
        <NavigationElement
          sx={stylesNext(btnNext)}
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
