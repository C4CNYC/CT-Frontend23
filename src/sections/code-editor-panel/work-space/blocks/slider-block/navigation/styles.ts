import { useTheme } from "@mui/material";

import { BtnType } from ".";

export const stylesPrev = (): Record<string, unknown> => {
  const theme = useTheme();
  return {
    width: "35%",
    borderRadius: "35px",
    color: "#000000 !important",
    pr: "51px",
    zIndex: 4,
    position: "relative",
    background: "rgba(196, 196, 196, .5)",
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

export const stylesNext = (btnNext: BtnType): Record<string, unknown> => {
  const theme = useTheme();
  const getBg = (): string => {
    if (btnNext === BtnType.next) {
      return "#43D4DD";
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
    width: "65%",
    marginLeft: "-45px",
    pl: "30px",
    color: !(btnNext === BtnType.next || btnNext === BtnType.compleated)
      ? "#43D4DD!important"
      : "#fff",
    zIndex: 5,
    pointerEvents: btnNext === BtnType.coding ? "none" : "auto",
    position: "relative",
    background: getBg(),
    "&:hover": {
      backgroundColor: getBg(),
      border: "none",
    },
    [theme.breakpoints.down(450)]: {
      width: "75%",
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
    right: "10px",
    zIndex: 6,
    [theme.breakpoints.down(1100)]: {
      top: "-20px",
      right: "0px",
    },
    [theme.breakpoints.down(1000)]: {
      right: "10px",
    },
    [theme.breakpoints.down(450)]: {
      right: "3px",
      top: "-25px",
    },
    border: "1px solid #fff",
    fontSize: ".7rem",
    "&:hover": {
      backgroundColor: "#272727",
    },
  };
};
