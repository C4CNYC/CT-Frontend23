import NextLink from "next/link";

import { Link, ListItemIcon, ListItemText } from "@mui/material";

import { Iconify } from "@components";

import { ListItem } from "./styles";
import { NavItemMobileProps } from "../types";

export default function NavItem({
  item,
  open,
  active,
  isExternalLink,
  ...other
}: NavItemMobileProps): React.ReactElement | null {
  const { title, path, icon, children } = item;

  const renderContent = (
    <ListItem active={active} {...other}>
      <ListItemIcon> {icon} </ListItemIcon>

      <ListItemText disableTypography primary={title} />

      {!!children && (
        <Iconify
          width={16}
          icon={
            open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"
          }
          sx={{ ml: 1 }}
        />
      )}
    </ListItem>
  );

  // ExternalLink
  if (isExternalLink) {
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
        {renderContent}
      </Link>
    );
  }

  // Has child
  if (children) {
    return renderContent;
  }

  // Default
  return (
    <Link component={NextLink} href={path} underline="none">
      {renderContent}
    </Link>
  );
}
