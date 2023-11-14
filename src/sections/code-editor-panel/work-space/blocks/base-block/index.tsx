import { type FC, type ReactNode, useMemo } from "react";

import {
  type SxProps,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";

import Header from "./header";
import TabButton from "./tab-button";

import { useSelector } from "src/redux/store";

interface IBaseBlock {
  children: ReactNode;
  className?: string;
  title: string;
  icon: React.ReactElement;
  hideTabsHandler?: () => void;
}

const BaseBlock: FC<IBaseBlock> = ({
  children,
  className,
  title,
  icon,
  hideTabsHandler,
}) => {
  const theme = useTheme();
  const isTabletAndMobile = useMediaQuery(theme.breakpoints.down(1000));
  const boxStyles = useMemo(() => getBoxStyles(isTabletAndMobile), [useTheme]);
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab);

  const isTabLeft = isTabletAndMobile && activeTab !== 0;
  const isTabRight = isTabletAndMobile && activeTab !== 2

  return (
    <Box
      className={className}
      flex={"1 1 0px"}
      position="relative"
      sx={boxStyles}
    >
      <Header
        title={title}
        icon={icon}
        hideTabsHandler={hideTabsHandler}
      />
      {children}

      {isTabLeft && <TabButton orientation="left" />}

      {isTabRight && <TabButton orientation="right" />}
    </Box>
  );
};

const getBoxStyles = (isTabletAndMobile: boolean): SxProps => ({
  height: isTabletAndMobile
    ? "calc(100vh - 80px)"
    : "calc(100vh - 105px)",
  border: isTabletAndMobile ? "none" : "3px solid rgb(234, 234, 235)",
  overflow: "hidden",
  position: "relative",
  borderRadius: isTabletAndMobile ? "0 0 20px 20px" : 2,
})

export default BaseBlock;
