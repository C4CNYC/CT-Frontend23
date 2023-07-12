import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

import DesktopBar from "./DesktopBar";
import MobileBar from "./MobileBar";

interface INavBar {
  chatComponent: React.ReactElement;
}

const NavBar = ({ chatComponent }: INavBar): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));

  if (isDesktop) return <DesktopBar chatComponent={chatComponent} />;
  return <MobileBar />;
};

export default NavBar;
