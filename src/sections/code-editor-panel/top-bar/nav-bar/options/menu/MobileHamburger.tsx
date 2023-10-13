import { type MouseEventHandler, type FC, useMemo } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, SxProps, alpha } from "@mui/material";
import { Theme } from "@mui/system";

export interface MobileHamburgerProps {
  open: boolean | null;
  handleOpenPopover: MouseEventHandler<HTMLButtonElement>
  handleClosePopover: () => void
}

const MobileHamburger: FC<MobileHamburgerProps> = ({
  open,
  handleOpenPopover,
  handleClosePopover,
}) => {
  const boxStyles = useMemo(() => getBoxStyles(open), [open])

  return (
    <Box sx={boxStyles}>
      {!open ? (
        <IconButton onClick={handleOpenPopover}>
          <MenuIcon sx={MENU_ITEM_STYLES} />
        </IconButton>
      ) : (
        <IconButton onClick={handleClosePopover}>
          <CloseIcon sx={MENU_ITEM_STYLES} />
        </IconButton>
      )}
    </Box>
  );
}

const getBoxStyles = (isOpen: boolean | null): SxProps<Theme> => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  background: alpha("#155275CC", isOpen === true ? 1 : 0.4),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const MENU_ITEM_STYLES = {
  color: "#fff"
};

export default MobileHamburger;
