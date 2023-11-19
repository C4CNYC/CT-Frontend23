import { type FC, type ReactNode } from "react";

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
import { TYP_SX, getButtonSx } from "./constants";

interface HeaderProps {
  title: ReactNode;
  icon: React.ReactElement;
  isCodeBlock?: boolean;
  closeHandler: () => void;
  hideTabsHandler?: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  icon,
  isCodeBlock,
  closeHandler,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));

  return (
    <Box
      sx={{
        display: isDesktop ? "flex" : "none",
        width: "100%",
        background: "#fff",
        alignItems: "center",
        gap: 2,
        px: 1,
        py: 0.5,
        borderBottom: isDesktop ? "2px solid #5FD0D5" : "none",
        zIndex: 2,
        position: "relative",
      }}
    >
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
        sx={() => ({ ...getButtonSx(isCodeBlock) })}
      >
        <AiOutlineClose size={20} />
      </Button>
    </Box>
  );
};

export default Header;
