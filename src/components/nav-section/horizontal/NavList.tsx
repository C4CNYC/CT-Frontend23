import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import useActiveLink from "src/hooks/useActiveLink";

import { NavListProps } from "../types";
import NavItem from "./NavItem";
import { StyledPopover } from "./styles";

// ----------------------------------------------------------------------

interface NavListRootProps {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
}

export default function NavList({
  data,
  depth,
  hasChild,
}: NavListRootProps): React.ReactElement | null {
  const navRef = useRef(null);

  const { pathname } = useRouter();

  const { active, isExternalLink } = useActiveLink(data.path);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  useEffect(() => {
    const appBarEl = Array.from(document.querySelectorAll(".MuiAppBar-root"));

    // Reset styles when hover
    const styles = (): void => {
      document.body.style.overflow = "";
      document.body.style.padding = "";
      // Apply for Window
      appBarEl.forEach((elem: any) => {
        elem.style.padding = "";
      });
    };

    if (open) {
      styles();
    } else {
      styles();
    }
  }, [open]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <NavItem
        ref={navRef}
        item={data}
        depth={depth}
        open={open}
        active={active}
        isExternalLink={isExternalLink}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      />

      {hasChild && (
        <StyledPopover
          open={open}
          anchorEl={navRef.current}
          anchorOrigin={
            depth === 1
              ? { vertical: "bottom", horizontal: "left" }
              : { vertical: "center", horizontal: "right" }
          }
          transformOrigin={
            depth === 1
              ? { vertical: "top", horizontal: "left" }
              : { vertical: "center", horizontal: "left" }
          }
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          <NavSubList data={data.children} depth={depth} />
        </StyledPopover>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

interface NavListSubProps {
  data: NavListProps[];
  depth: number;
}

function NavSubList({
  data,
  depth,
}: NavListSubProps): React.ReactElement | null {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
        />
      ))}
    </>
  );
}
