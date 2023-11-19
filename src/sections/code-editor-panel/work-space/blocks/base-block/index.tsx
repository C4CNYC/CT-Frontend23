import { type FC, type ReactNode, useMemo, useState } from "react";

import { TbArrowsMinimize } from "react-icons/tb";

import {
  Box,
  Button,
  Collapse,
  type SxProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { localStorageAvailable } from "@utils";
import { useSelector } from "src/redux/store";

import Header from "./header";
import TabButton from "./tab-button";

interface IBaseBlock {
  children: ReactNode;
  className: "instructions" | "codeEditorTour" | "browserTour";
  title: ReactNode;
  icon: React.ReactElement;
  hideTabsHandler?: () => void;
}

const isClosedHeaders = {
  instructions: true,
  codeEditorTour: true,
  browserTour: true,
};

const localStorageKey = "HeadersSettings";

const BaseBlock: FC<IBaseBlock> = ({
  children,
  className,
  title,
  icon,
  hideTabsHandler,
}) => {
  const theme = useTheme();
  const storageAvailable = localStorageAvailable();
  const isTabletAndMobile = useMediaQuery(theme.breakpoints.down(1000));
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const boxStyles = useMemo(() => getBoxStyles(isTabletAndMobile), [useTheme]);
  const buttonSx = useMemo(() => getButtonSx(isDesktop), [useTheme]);
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab);

  const getHeaderSettings = () => {
    if (storageAvailable) {
      const headerSettings = JSON.parse(
        window.localStorage.getItem(localStorageKey) ??
          JSON.stringify(isClosedHeaders)
      );
      return headerSettings;
    }
  };

  const isTabLeft = isTabletAndMobile && activeTab !== 0;
  const isTabRight = isTabletAndMobile && activeTab !== 2;
  const [isClosedHeader, setIsClosedHeader] = useState(() =>
    getHeaderSettings()
  );

  const closeHeaderHandler = (): void => {
    setIsClosedHeader({ ...isClosedHeader, [className]: false });

    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({ ...getHeaderSettings(), [className]: false })
    );
  };

  return (
    <Box
      className={className}
      flex={"1 1 0px"}
      position="relative"
      sx={boxStyles}
    >
      <Collapse in={isClosedHeader?.[className]}>
        <Header
          title={title}
          icon={icon}
          hideTabsHandler={hideTabsHandler}
          isCodeBlock={!hideTabsHandler}
          closeHandler={closeHeaderHandler}
        />
      </Collapse>

      {hideTabsHandler && (
        <Button sx={buttonSx} onClick={hideTabsHandler}>
          <TbArrowsMinimize size={19} />
        </Button>
      )}

      {children}

      {isTabLeft && <TabButton orientation="left" />}

      {isTabRight && <TabButton orientation="right" />}
    </Box>
  );
};

const getBoxStyles = (isTabletAndMobile: boolean): SxProps => ({
  height: isTabletAndMobile ? "calc(100vh - 80px)" : "calc(100vh - 105px)",
  border: isTabletAndMobile ? "none" : "3px solid rgb(234, 234, 235)",
  overflow: "hidden",
  position: "relative",
  borderRadius: isTabletAndMobile ? "0 0 20px 20px" : 2,
});

export const getButtonSx = (isDesktop: boolean): SxProps => ({
  display: isDesktop ? "flex" : "none",
  ml: 3,
  position: "absolute",
  top: 5,
  right: 5,
  p: 0.2,
  minWidth: "0",
  color: "#5FD0D5",
  zIndex: 20,
  "&:hover": {
    background: "none",
  },
});

export default BaseBlock;
