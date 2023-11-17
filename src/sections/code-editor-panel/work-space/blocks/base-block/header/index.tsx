import { type FC, type ReactNode, useMemo, useState } from "react";

import { IoMdClose } from "react-icons/io";
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

const Header: FC<HeaderProps> = ({ title, icon, hideTabsHandler }) => {
  const [isOpenHeader, setIsOpenHeader] = useState(true);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));

  return (
    <Box sx={() => ({ ...getBoxStyles(isDesktop, isOpenHeader) })}>
      <Stack direction="row">
        {icon}

        <Typography variant="subtitle1" sx={TYP_SX}>
          {title}
        </Typography>
      </Stack>

      {/* <Button
        onClick={() => {
          setIsOpenHeader(false);
        }}
        sx={{ ...BUTTON_SX, ml: 0 }}
      >
        <IoMdClose size={20} />
      </Button> */}

      {hideTabsHandler != null && (
        <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
          <Button
            onClick={() => {
              setIsOpenHeader(false);
            }}
            sx={{ ...BUTTON_SX, ml: 0 }}
          >
            <IoMdClose size={20} />
          </Button>
          <Button sx={BUTTON_SX} onClick={hideTabsHandler}>
            <TbArrowsMinimize size={19} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
