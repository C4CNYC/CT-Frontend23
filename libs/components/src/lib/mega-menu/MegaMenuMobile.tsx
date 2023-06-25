import { forwardRef, useEffect, useState } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
// config
import { ICON, NAV } from "../../config-global";
// @types
import { MegaMenuItemProps, ParentItemProps } from "./types";
//
import { Iconify } from "../iconify";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";

// ----------------------------------------------------------------------

interface Props {
  data: MegaMenuItemProps[];
}

export function MegaMenuMobile({
  data,
}: Props): React.ReactElement | null {
  const { pathname } = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      handleCloseDrawer();
    }
  }, [pathname]);

  const handleOpenDrawer = (): void => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = (): void => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpenDrawer}
        startIcon={<Iconify icon="eva:menu-2-fill" />}
      >
        Menu Mobile
      </Button>

      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: NAV.W_BASE } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <Typography
            variant="h6"
            sx={{ px: 2, mb: 2, display: "flex", alignItems: "center" }}
          >
            <Iconify icon="eva:list-fill" sx={{ mr: 1 }} /> Categories
          </Typography>

          {data.map((parent) => (
            <SubMenu key={parent.title} parent={parent} pathname={pathname} />
          ))}
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const ParentItem = forwardRef<HTMLDivElement, ParentItemProps>(
  ({ icon, title, hasSub, ...other }, ref) => (
    <ListItemButton
      ref={ref}
      sx={{ height: 44, textTransform: "capitalize" }}
      {...other}
    >
      <ListItemIcon sx={{ width: 22, height: 22 }}>{icon}</ListItemIcon>
      <ListItemText primaryTypographyProps={{ typography: "body2" }}>
        {title}
      </ListItemText>
      {hasSub && <Iconify icon="eva:arrow-ios-forward-fill" />}
    </ListItemButton>
  )
);

// ----------------------------------------------------------------------

interface SubMenuProps {
  parent: MegaMenuItemProps;
  pathname: string;
}

function SubMenu({
  parent,
  pathname,
}: SubMenuProps): React.ReactElement | null {
  const { title, icon, path, children } = parent;

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      handleCloseDrawer();
    }
  }, [pathname]);

  const handleOpenDrawer = (): void => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = (): void => {
    setOpenDrawer(false);
  };

  if (children) {
    return (
      <>
        <ParentItem
          title={title}
          icon={icon}
          onClick={handleOpenDrawer}
          hasSub
        />

        <Drawer
          open={openDrawer}
          onClose={handleCloseDrawer}
          BackdropProps={{ invisible: true }}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_BASE - 12,
              borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
            },
          }}
        >
          <Stack direction="row" alignItems="center" px={1} py={1.5}>
            <IconButton onClick={handleCloseDrawer}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>

            <Typography
              noWrap
              variant="subtitle1"
              sx={{ ml: 1, textTransform: "capitalize" }}
            >
              {title}
            </Typography>
          </Stack>
          <Divider />

          <Scrollbar>
            <Stack spacing={5} py={3}>
              {children.map((list) => {
                const { subheader, items } = list;

                return (
                  <List key={subheader} disablePadding>
                    <Typography
                      component="div"
                      variant="overline"
                      sx={{ px: 2.5, mb: 1, color: "text.secondary" }}
                      noWrap
                    >
                      {subheader}
                    </Typography>
                    {items.map((link) => (
                      <Link
                        key={link.title}
                        component={NextLink}
                        href={link.path}
                        color="inherit"
                        underline="none"
                      >
                        <ListItemButton sx={{ px: 1.5 }}>
                          <ListItemIcon
                            sx={{
                              mr: 0.5,
                              width: ICON.NAV_ITEM,
                              height: ICON.NAV_ITEM,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                bgcolor: "currentColor",
                                borderRadius: "50%",
                              }}
                            />
                          </ListItemIcon>

                          <ListItemText
                            primary={link.title}
                            primaryTypographyProps={{
                              noWrap: true,
                              typography: "body2",
                            }}
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                );
              })}
            </Stack>
          </Scrollbar>
        </Drawer>
      </>
    );
  }

  return (
    <Link component={NextLink} href={path} color="inherit" underline="none">
      <ParentItem title={title} icon={icon} />
    </Link>
  );
}
