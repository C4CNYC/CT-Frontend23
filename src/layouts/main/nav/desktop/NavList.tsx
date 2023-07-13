import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Fade, Portal, Stack } from "@mui/material";

import useActiveLink from "src/hooks/useActiveLink";

import { NavItemProps } from "../types";
import { NavItem, NavItemDashboard } from "./NavItem";
import { StyledMenu, StyledSubheader } from "./styles";

// ----------------------------------------------------------------------

interface NavListProps {
  item: NavItemProps;
  isOffset: boolean;
}

export default function NavList({
  item,
  isOffset,
}: NavListProps): React.ReactElement | null {
  const { pathname } = useRouter();

  const [openMenu, setOpenMenu] = useState(false);

  const { path, children } = item;

  const { active, isExternalLink } = useActiveLink(path, false);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
  }, [pathname]);

  const handleOpenMenu = (): void => {
    if (children) {
      setOpenMenu(true);
    }
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
  };

  return (
    <>
      <NavItem
        item={item}
        isOffset={isOffset}
        active={active}
        open={openMenu}
        isExternalLink={isExternalLink}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      />

      {!!children && openMenu && (
        <Portal>
          <Fade in={openMenu}>
            <StyledMenu
              onMouseEnter={handleOpenMenu}
              onMouseLeave={handleCloseMenu}
            >
              {children.map((list) => (
                <NavSubList
                  key={list.subheader}
                  subheader={list.subheader}
                  items={list.items}
                  isDashboard={list.subheader === "Dashboard"}
                  onClose={handleCloseMenu}
                />
              ))}
            </StyledMenu>
          </Fade>
        </Portal>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

interface NavSubListProps {
  isDashboard: boolean;
  subheader: string;
  items: NavItemProps[];
  onClose: VoidFunction;
}

function NavSubList({
  items,
  isDashboard,
  subheader,
  onClose,
}: NavSubListProps): React.ReactElement | null {
  const { pathname } = useRouter();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <Stack
      spacing={2.5}
      gridColumn={isDashboard ? "span 6" : "span 2"}
      alignItems="flex-start"
    >
      <StyledSubheader disableSticky>{subheader}</StyledSubheader>

      {items.map((item) =>
        isDashboard ? (
          <NavItemDashboard key={item.title} item={item} onClick={onClose} />
        ) : (
          <NavItem
            subItem
            key={item.title}
            item={item}
            active={isActive(item.path)}
            onClick={onClose}
          />
        )
      )}
    </Stack>
  );
}
