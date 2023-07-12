import { useState } from "react";
import { useRouter } from "next/router";

import { Collapse } from "@mui/material";

import { NavSectionVertical } from "@components";

import NavItem from "./NavItem";

import { useActiveLink } from "@hooks";
import { NavItemProps } from "../types";

interface NavListProps {
  item: NavItemProps;
}

export default function NavList({
  item,
}: NavListProps): React.ReactElement | null {
  const { pathname } = useRouter();

  const { path, children } = item;

  const { isExternalLink } = useActiveLink(path);

  const [open, setOpen] = useState(false);

  return (
    <>
      <NavItem
        item={item}
        open={open}
        onClick={() => {
          setOpen(!open);
        }}
        active={pathname === path}
        isExternalLink={isExternalLink}
      />

      {!!children && (
        <Collapse in={open} unmountOnExit>
          <NavSectionVertical
            data={children}
            sx={{
              "& .MuiList-root:last-of-type .MuiListItemButton-root": {
                height: 160,
                backgroundSize: "cover",
                backgroundPosition: "center",
                bgcolor: "background.neutral",
                backgroundRepeat: "no-repeat",
                backgroundImage:
                  "url(/assets/illustrations/illustration_dashboard.png)",
                "& > *:not(.MuiTouchRipple-root)": { display: "none" },
              },
            }}
          />
        </Collapse>
      )}
    </>
  );
}
