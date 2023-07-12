import { useState } from "react";

// @mui
import { Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

// components
import {
  IconButtonAnimate,
  Iconify,
  MenuPopover,
  Scrollbar,
} from "@components";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

export default function ContactsPopover(): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? "primary" : "default"}
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Iconify icon="eva:people-fill" />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 320 }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <Typography component="span"></Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}></Scrollbar>
      </MenuPopover>
    </>
  );
}
