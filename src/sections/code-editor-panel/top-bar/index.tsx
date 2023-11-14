import {
  type FC,
  type ReactNode,
  useMemo
} from "react";

import {
  type SxProps,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";

import GroupHeader from "./group-header";
import Logo from "./logo";
import DesktopBar from "./nav-bar/desktop-bar";
import MobileBar from "./nav-bar/mobile-bar";

interface ITopPanel {
  chatComponent: ReactNode;
  onHanldeFullScreen: () => void
  isFullScreenView: boolean
}

const TopPanel: FC<ITopPanel> = ({
  chatComponent,
  onHanldeFullScreen,
  isFullScreenView
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const boxStyles = useMemo(() => getBoxStyles(isDesktop), [isDesktop])

  return (
    <Box className="tourStart" sx={boxStyles}>
      <Logo />
      <GroupHeader />
      
      {isDesktop
        ? (
          <DesktopBar
            chatComponent={chatComponent}
            onHanldeFullScreen={onHanldeFullScreen}
            isFullScreenView={isFullScreenView}
          />
        )
        : <MobileBar />
      }
    </Box>
  );
};

const getBoxStyles = (isDesktop: boolean): SxProps => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: isDesktop ? "50px" : "25px",
  px: "24px",
})

export default TopPanel;
