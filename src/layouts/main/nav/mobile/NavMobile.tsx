import { 
  useState,
  useEffect, 
} from "react";
import { useRouter } from "next/router";

import { 
  List,
  Drawer, 
  IconButton, 
} from "@mui/material";

import { 
  Logo,
  Iconify, 
  Scrollbar, 
} from "@components";

import NavList from "./NavList";

import { NavProps } from "../types";
import { NAV } from "../../../../config-global";

export default function NavMobile({
  isOffset,
  data,
}: NavProps): React.ReactElement | null {
  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          ml: 1,
          ...(isOffset && {
            color: "text.primary",
          }),
        }}
      >
        <Iconify icon="eva:menu-2-fill" />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
