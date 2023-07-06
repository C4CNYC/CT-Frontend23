import { ListItemButtonProps, StackProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface INavItem {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active?: boolean;
  isExternalLink?: boolean;
}

export type NavItemProps = INavItem & ListItemButtonProps;

export interface NavListProps {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
  component?: (children: React.ReactElement) => React.ReactElement;
}

export interface NavSectionProps extends StackProps {
  data: Array<{
    subheader: string;
    items: NavListProps[];
  }>;
}
