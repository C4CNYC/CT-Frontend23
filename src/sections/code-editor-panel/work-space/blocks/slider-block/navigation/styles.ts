import { useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

import { BtnType } from ".";

export const stylesPrev = (): Record<string, unknown> => {
  const theme = useTheme();
  return {
    width: "35%",
    borderRadius: "35px",
    color: theme.palette.text.secondary,
    pr: "51px",
    zIndex: 4,
    position: "relative",
    background: "rgba(196, 196, 196, .5)",
    boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      background: "rgba(196, 196, 196, .7)",
      border: "none",
    },
    [theme.breakpoints.between(1000, 1100)]: {
      width: "45%",
    },
    [theme.breakpoints.down(1000)]: {
      width: "35%",
      pr: "30px",
    },
    [theme.breakpoints.down(450)]: {
      width: "35%",
      pr: "51px",
    },
  };
};

export const getTooltipWrapperSx = (theme: Theme): SxProps => ({
  position: "relative",
  width: "65%",
  marginLeft: "-45px",
  [theme.breakpoints.down(450)]: {
    width: "75%",
  },
});

export const TOOLTIP_CONTENT_SX = {
  fontSize: "12px",
  textAlign: "center",
  width: 170,
};

export const stylesNext = (btnNext: BtnType): Record<string, unknown> => {
  const getBg = (hover?: boolean): string => {
    if (btnNext === BtnType.next) {
      return hover ? "#EE467A" : "#FFF";
    }
    if (btnNext === BtnType.coding) {
      return "#155275CC";
    }
    if (btnNext === BtnType.compleated) {
      return "#75CF6D";
    }
    return "";
  };
  return {
    borderRadius: "35px",
    pl: "30px",
    width: "100%",
    height: "100%",
    color: !(btnNext === BtnType.next || btnNext === BtnType.compleated)
      ? "#43D4DD!important"
      : "#EE467A",
    zIndex: 5,
    pointerEvents: btnNext === BtnType.coding ? "none" : "auto",
    position: "relative",
    boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    background: getBg(),
    "&:hover": {
      color: "#FFF",
      bgcolor: getBg(true),
      border: "none",
    },
  };
};

export const stylesSkip = () => {
  const theme = useTheme();
  return {
    background: "#272727",
    color: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    minWidth: "auto",
    position: "absolute",
    top: "-15px",
    right: "-13px",
    zIndex: 6,
    [theme.breakpoints.down(1100)]: {
      top: "-25px",
      right: "-5px",
    },
    [theme.breakpoints.down(1000)]: {
      right: "-13px",
      top: "-20px",
    },
    [theme.breakpoints.down(450)]: {
      right: "-3px",
      top: "-25px",
    },
    border: "1px solid #fff",
    fontSize: ".7rem",
    "&:hover": {
      backgroundColor: "#272727",
    },
  };
};
