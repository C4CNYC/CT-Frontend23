import { type FC, type ReactNode, useMemo, useState } from "react";

import { Box, Button, Collapse, useMediaQuery, useTheme } from "@mui/material";

import { localStorageAvailable } from "@utils";
import { useSelector } from "src/redux/store";

import { getBoxStyles, getButtonSx, getButtonWrapperSx } from "./constants";
import Header from "./header";
import TabButton from "./tab-button";

interface IBaseBlock {
  children: ReactNode;
  className: "instructions" | "codeEditorTour" | "browserTour";
  title: ReactNode;
  icon: React.ReactElement;
  closeIcon?: React.ReactElement;
  isLeftBtn?: boolean;
  hideTabsHandler?: () => void;
  isLeftBlock?: boolean;
  takeHeaderSettings?: (isOpen: boolean) => void;
}

const isClosedHeaders = {
  instructions: true,
  codeEditorTour: true,
  browserTour: true,
};

interface IHeaderSettings {
  instructions: boolean;
  codeEditorTour: boolean;
  browserTour: boolean;
}

const localStorageKey = "HeadersSettings";

const BaseBlock: FC<IBaseBlock> = ({
  children,
  className,
  title,
  icon,
  closeIcon,
  isLeftBtn,
  isLeftBlock,
  hideTabsHandler,
  takeHeaderSettings,
}) => {
  const theme = useTheme();
  const storageAvailable = localStorageAvailable();
  const isTabletAndMobile = useMediaQuery(theme.breakpoints.down(1000));
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const boxStyles = useMemo(() => getBoxStyles(isTabletAndMobile), [useTheme]);
  const buttonSx = useMemo(() => getButtonSx(isDesktop), [useTheme]);
  const buttonWrapperSx = useMemo(
    () => getButtonWrapperSx(isDesktop, isLeftBtn),
    [isDesktop]
  );
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
  const [isClosedHeader, setIsClosedHeader] = useState<IHeaderSettings>(() =>
    getHeaderSettings()
  );

  const closeHeaderHandler = (): void => {
    setIsClosedHeader({ ...isClosedHeader, [className]: false });

    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({ ...getHeaderSettings(), [className]: false })
    );
  };

  if (takeHeaderSettings) {
    takeHeaderSettings(isClosedHeader?.browserTour);
  }

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
          isLeftBtn={isLeftBtn}
          closeHandler={closeHeaderHandler}
          isLeftBlock={isLeftBlock}
        />
      </Collapse>

      {hideTabsHandler && (
        <Box sx={buttonWrapperSx}>
          <Button sx={buttonSx} onClick={hideTabsHandler}>
            {closeIcon}
          </Button>
        </Box>
      )}

      {children}

      {isTabLeft && <TabButton orientation="left" />}

      {isTabRight && <TabButton orientation="right" />}
    </Box>
  );
};

export default BaseBlock;
