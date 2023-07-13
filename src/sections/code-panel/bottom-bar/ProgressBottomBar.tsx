import { useContext, useEffect, useState } from "react";

import { useAtom } from "jotai";

import { Box, Slider, useMediaQuery, useTheme } from "@mui/material";

import { globalCodePanelAtom } from "../atoms/global-code-panel.atom";
import { CodePanelContext } from "../context/CodePanel.context";

export default function ProgressBottomBar(): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { data } = useContext(CodePanelContext);
  const [{ slideIndex }] = useAtom(globalCodePanelAtom);
  const [value, setValue] = useState<number>(10);

  const getValue = (): number => {
    if (data.length && slideIndex) {
      return Math.floor((slideIndex * 100) / (data.length - 1));
    }
    return 0;
  };
  useEffect(() => {
    setValue(getValue());
  }, [data, slideIndex]);

  const style = {
    color: "#52af77",
    height: "14px",
    pointerEvents: "none !important",
    "& .MuiSlider-thumb": {
      width: "30px",
      height: "30px",
      backgroundColor: "#FFD874",
      backgroundImage: "url(/assets/code-panel/compleate.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "20px",
      "&:hover": {
        pointerEvents: "none !important",
        boxShadow: "none !important",
      },
      "&:not(.MuiSlider-active)": {
        transition: "left .5s ease-in",
      },
    },
    "& .MuiSlider-track": {
      transition: "width .5s ease-in",
    },
    "& .MuiSlider-rail": {
      opacity: 1,
      backgroundColor: "#404040",
    },
  } as const;

  return (
    <Box
      className="coursesTour"
      sx={{
        width: isDesktop ? "70%" : "100%",
        position: "relative",
        p: isDesktop ? "0" : "10px 0 0 20px",
      }}
    >
      <Slider
        aria-label="Default-slider"
        valueLabelDisplay="auto"
        defaultValue={3}
        value={value}
        sx={style}
      />
    </Box>
  );
}
