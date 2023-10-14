import {
  type FC,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";

import { Box, Slider, useMediaQuery, useTheme } from "@mui/material";

import { useSelector } from 'src/redux/store';
import {
  SLIDER_STYLE,
  getBoxStyles
} from "./constants";

export interface ProgressBottomBarProps {
  sliderSteps: number
}

const DEFAULT_VALUE = 10;

const ProgressBottomBar: FC<ProgressBottomBarProps> = ({
  sliderSteps
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const boxStyles = useMemo(() => getBoxStyles(isDesktop), [isDesktop]);
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex);
  const [value, setValue] = useState(DEFAULT_VALUE);

  const getValue = useCallback((): number => {
    if (sliderSteps > 0 && slideIndex) {
      return Math.floor((slideIndex * 100) / (sliderSteps - 1));
    }
    return 0;
  }, [sliderSteps, slideIndex])

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <Box className="coursesTour" sx={boxStyles}>
      <Slider
        aria-label="Default-slider"
        valueLabelDisplay="auto"
        defaultValue={3}
        value={value}
        sx={SLIDER_STYLE}
      />
    </Box>
  );
}

export default ProgressBottomBar