import { type FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineSwipeLeft, MdOutlineSwipeRight } from "react-icons/md";

import { Box, IconButton } from "@mui/material";

import { useSelector } from "src/redux/store";
import { setTab } from "src/redux/slices/mobile-tab-manager";
import {
  SWIPE_LEFT_STYLE,
  SWIPE_RIGHT_STYLE,
  getBoxStyles
} from "./constants";

interface TabButtonProps {
  orientation: string;
}

const TabButton: FC<TabButtonProps> = ({
  orientation,
}) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab);
  const boxStyles = useMemo(() => getBoxStyles(orientation), [orientation]);
  const isLeftOrientation = orientation === "left"

  const changeTab = (): void => {
    const nextTab = isLeftOrientation
      ? activeTab - 1
      : activeTab + 1;

    dispatch(setTab(nextTab));
  };

  return (
    <Box sx={boxStyles}>
      <IconButton onClick={changeTab}>
        {isLeftOrientation ? (
          <MdOutlineSwipeRight
            size="20px"
            color="#EE467A"
            style={SWIPE_RIGHT_STYLE}
          />
        ) : (
          <MdOutlineSwipeLeft
            size="20px"
            color="#EE467A"
            style={SWIPE_LEFT_STYLE}
          />
        )}
      </IconButton>
    </Box>
  );
}

export default TabButton;
