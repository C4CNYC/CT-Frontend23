import { type FC } from "react";

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  COLLAPSEBAR_TITLE_SX,
  HIDE_BUTTON_SX,
  getCollapsebarSx,
} from "./constants";

interface IHidedTabRtn {
  title: string;
  icon: React.ReactElement;
  openPanelFnc: () => void;
}

const HidedTabBtn: FC<IHidedTabRtn> = ({ icon, title, openPanelFnc }) => {
  const theme = useTheme();
  const isTabletAndMobile = useMediaQuery(theme.breakpoints.down(1000));

  return (
    <>
      <Box
        position="relative"
        onClick={() => {
          openPanelFnc();
        }}
        sx={() => ({
          ...getCollapsebarSx(isTabletAndMobile),
        })}
      >
        <Button sx={HIDE_BUTTON_SX}>{icon}</Button>
        <Typography sx={COLLAPSEBAR_TITLE_SX}>{title}</Typography>
      </Box>
    </>
  );
};

export default HidedTabBtn;
