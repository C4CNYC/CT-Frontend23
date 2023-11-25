import { type FC,type ReactNode, useMemo } from "react";
import { TbArrowsMinimize } from "react-icons/tb";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { BUTTON_SX, TYP_SX, getBoxStyles } from "./constants";

interface HeaderProps {
  title: ReactNode;
  icon: React.ReactElement;
  hideTabsHandler?: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  icon,
  hideTabsHandler,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const boxStyles = useMemo(() => getBoxStyles(isDesktop), [isDesktop])

  return (
    <Box sx={boxStyles}>
      <Stack direction="row">
        {icon}

        <Typography
          variant="subtitle1"
          sx={TYP_SX}
        >
          {title}
        </Typography>
      </Stack>

      {hideTabsHandler != null && (
        <Button
          sx={BUTTON_SX}
          onClick={hideTabsHandler}
        >
          <TbArrowsMinimize size={19} />
        </Button>
      )}
    </Box>
  );
}

export default Header;
