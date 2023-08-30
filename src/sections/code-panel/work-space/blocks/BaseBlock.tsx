import { useAtom } from "jotai";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";

import { mobileTabManager } from "@sections/code-panel/atoms/mobile-tab-manager.atom";

import BaseBlockHeader from "./BaseBlockHeader";
import TabChangerBtn from "./TabChangerBtn";

interface IBaseBlock {
  children: React.ReactElement | React.ReactFragment;
  className?: string;
  title: string;
  icon: React.ReactElement;
  hideTabsHandler?: () => void;
}

const BaseBlock = ({
  children,
  className,
  title,
  icon,
  hideTabsHandler,
}: IBaseBlock): React.ReactElement => {
  const theme = useTheme();
  const isTabletAndMobile = useMediaQuery(theme.breakpoints.down(1000));
  const [{ activeTab }] = useAtom(mobileTabManager);
  return (
    <Box
      className={className}
      flex={"1 1 0px"}
      position="relative"
      sx={{
        height: isTabletAndMobile
          ? "calc(100vh - 80px)"
          : "calc(100vh - 105px)",
        border: isTabletAndMobile ? "none" : "3px solid rgb(234, 234, 235)",
        overflow: "hidden",
        position: "relative",
        borderRadius: isTabletAndMobile ? "0 0 20px 20px" : 2,
      }}
    >
      <BaseBlockHeader
        title={title}
        icon={icon}
        hideTabsHandler={hideTabsHandler}
      />
      {children}
      {isTabletAndMobile && activeTab !== 0 ? (
        <TabChangerBtn orientation="left" />
      ) : null}
      {isTabletAndMobile && activeTab !== 2 ? (
        <TabChangerBtn orientation="right" />
      ) : null}
    </Box>
  );
};

export default BaseBlock;
