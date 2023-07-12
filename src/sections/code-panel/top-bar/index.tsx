import { Box, useMediaQuery, useTheme } from "@mui/material";

import GroupHeader from "./GroupHeader";
import Logo from "./Logo";
import NavBar from "./nav-bar";

interface ITopPanel {
  chatComponent: React.ReactElement;
}

const TopPanel = ({ chatComponent }: ITopPanel): React.ReactElement | null => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  return (
    <Box
      className="tourStart"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: isDesktop ? "50px" : "25px",
        px: "24px",
      }}
    >
      <Logo />
      <GroupHeader />
      <NavBar chatComponent={chatComponent} />
    </Box>
  );
};

export default TopPanel;
