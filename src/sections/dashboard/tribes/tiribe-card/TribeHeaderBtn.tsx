import { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { CiExport } from "react-icons/ci";
import { ImExit } from "react-icons/im";

import { Box, Button, IconButton } from "@mui/material";

import { MenuPopover } from "@components";

import ExitTribeDialog from "../exitTribeDialog";

export default function TribeHeaderBtn(): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setOpenPopover(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "flex-end",
        pt: 1,
      }}
    >
      <IconButton
        sx={{
          color: "#454F5B",
          "&:hover": { background: "transparent", color: "#02D3D7" },
        }}
      >
        <CiExport size="20px" />
      </IconButton>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          color: "#454F5B",

          "&:hover": { background: "transparent", color: "#02D3D7" },
        }}
      >
        <BsThreeDotsVertical size="20px" />
      </IconButton>
      <MenuPopover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openPopover}
        onClose={handleClosePopover}
      >
        <ExitTribeDialog>
          <Button sx={{ gap: 1 }}>
            Left Tribe
            <ImExit size="20px" />
          </Button>
        </ExitTribeDialog>
      </MenuPopover>
    </Box>
  );
}
