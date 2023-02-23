import { ListItemButtonProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface NavItemProps {
  title: string;
  path: string;
  icon?: React.ReactElement;
  children?: Array<{
    subheader: string;
    items: Array<{
      title: string;
      path: string;
    }>;
  }>;
}

export interface NavItemDesktopProps extends ListItemButtonProps {
  item: NavItemProps;
  isOffset?: boolean;
  active?: boolean;
  open?: boolean;
  subItem?: boolean;
  isExternalLink?: boolean;
}

export interface NavItemMobileProps extends ListItemButtonProps {
  item: NavItemProps;
  active?: boolean;
  open?: boolean;
  isExternalLink?: boolean;
}

export interface NavProps {
  isOffset: boolean;
  data: NavItemProps[];
}
