import { type FC, type ReactNode, useState } from "react";

import { IoMdClose } from "react-icons/io";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { localStorageAvailable } from "@utils";

import { BUTTON_SX, TYP_SX } from "./constants";

interface HeaderProps {
  title: ReactNode;
  icon: React.ReactElement;
  hideTabsHandler?: () => void;
}

const Header: FC<HeaderProps> = ({ title, icon }) => {
  const storageAvailable = localStorageAvailable();
  let savedHeaderPosition = false;

  if (storageAvailable) {
    savedHeaderPosition = JSON.parse(
      window.localStorage.getItem(`isClosed${title}Header`) ?? "false"
    );
  }

  const [isClosedHeader, setIsClosedHeader] = useState(savedHeaderPosition);

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
        transform: `translateY(${isClosedHeader ? "-35px" : "0px"})`,
        transition: (theme) =>
          theme.transitions.create("all", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
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
          setIsClosedHeader(true);
          window.localStorage.setItem(
            `isClosed${title}Header`,
            JSON.stringify(true)
          );
        }}
        sx={{ ...BUTTON_SX }}
      >
        <IoMdClose size={20} />
      </Button>
    </Box>
  );
};

export default Header;
