import { useEffect, useState } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { Collapse } from "@mui/material";
// hooks
import { useActiveLink } from "@ct-nx/hooks";
//
import FeedbackDialog from "@sections/feedback/FeedbackDialog";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import { NavListProps } from "../types";
import NavItem from "./NavItem";
import { voidFunction } from "@ct-nx/utils";

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

  if (data.modal) {
    if (data.modal === "invite") {
      return (
        <InviteFriendsModal>
          <NavItem
            item={data}
            depth={depth}
            open={open}
            active={false}
            isExternalLink={false}
            onClick={voidFunction}
            modal={true}
          />
        </InviteFriendsModal>
      );
    }
    if (data.modal === "feedback") {
      return (
        <FeedbackDialog>
          <NavItem
            item={data}
            depth={depth}
            open={open}
            active={false}
            isExternalLink={false}
            onClick={voidFunction}
            modal={true}
          />
        </FeedbackDialog>
      );
    }
  }
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
