import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Collapse } from "@mui/material";

import useActiveLink from "src/hooks/useActiveLink";

import { NavListProps } from "../types";
import NavItem from "./NavItem";

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
  const { pathname } = useRouter();

  const { active, isExternalLink } = useActiveLink(data.path);

  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
  }, [pathname]);

  const handleToggle = (): void => {
    setOpen(!open);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        isExternalLink={isExternalLink}
        onClick={handleToggle}
      />

      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList data={data.children} depth={depth} />
        </Collapse>
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
