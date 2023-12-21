import { type FC, type ReactNode, useMemo } from "react";

import { AiOutlineClose } from "react-icons/ai";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// import { localStorageAvailable } from "@utils";
import { BUTTON_SX, TYP_SX, getHeaderWrapperSx } from "./constants";

interface HeaderProps {
  title: ReactNode;
  icon: React.ReactElement;
  isLeftBtn?: boolean;
  isLeftBlock?: boolean;
  closeHandler: () => void;
  hideTabsHandler?: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  icon,
  isLeftBtn,
  closeHandler,
  isLeftBlock,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const headerSx = useMemo(() => getHeaderWrapperSx(isDesktop), [isDesktop]);

  return (
    <Box sx={headerSx}>
      <Stack direction="row">
        {icon}

        <Typography variant="subtitle1" sx={TYP_SX}>
          {title}
        </Typography>
      </Stack>

      <Button
        onClick={() => {
          closeHandler();
        }}
        sx={BUTTON_SX}
      >
        <AiOutlineClose size={20} />
      </Button>
    </Box>
  );
};

export default Header;
