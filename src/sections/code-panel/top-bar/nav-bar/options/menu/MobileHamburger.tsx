import { SetStateAction } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, alpha } from "@mui/material";

interface Props {
  open: boolean | null;
  handleOpenPopover: (event: React.SyntheticEvent<SetStateAction<any>>) => void;
  handleClosePopover: (
    event: React.SyntheticEvent<SetStateAction<any>>
  ) => void;
}

export default function MobileHamburger({
  open,
  handleOpenPopover,
  handleClosePopover,
}: Props): React.ReactElement {
  return (
    <Box
      sx={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        background: alpha("#155275CC", !open ? 0.4 : 1),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!open ? (
        <IconButton onClick={handleOpenPopover}>
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>
      ) : (
        <IconButton onClick={handleClosePopover}>
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      )}
    </Box>
  );
}
