import { type FC, useEffect } from "react";

import {
  Box,
  Button,
  List,
  Popper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useSelector } from "src/redux/store";

import {
  BOX_STYLES,
  TYP_COLOR,
  BUTTON_STYLES,
  POPPER_OPTIONS,
  DESKTOP_POPPER_WIDTH,
  MOBILE_POPPER_WIDTH
} from './constants'

interface TipsPopoverProps {
  openPoper: boolean;
  anchorEl: HTMLElement | null;
  setOpenPoper: (open: boolean) => void;
  tips: string[];
}

const TipsPopover: FC<TipsPopoverProps> = ({
  openPoper,
  anchorEl,
  setOpenPoper,
  tips,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab);

  useEffect(() => {
    if (!isDesktop && activeTab !== 1) {
      setOpenPoper(false);
    }
  }, [isDesktop, activeTab]);

  const popperWidth = isDesktop
    ? DESKTOP_POPPER_WIDTH
    : MOBILE_POPPER_WIDTH;

  return (
    <Popper
      id="popper"
      open={openPoper}
      anchorEl={anchorEl}
      sx={{ width: popperWidth }}
      placement="left-end"
      modifiers={POPPER_OPTIONS}
    >
      <Box sx={BOX_STYLES}>
        <List>
          {tips.map((t, i) => (
            <Typography key={t} variant="body1" sx={TYP_COLOR}>
              {i + 1}. {t}
            </Typography>
          ))}
        </List>

        <Button
          onClick={() => {
            setOpenPoper(false);
          }}
          sx={BUTTON_STYLES}
        >
          OK
        </Button>
      </Box>
    </Popper>
  );
}

export default TipsPopover;
