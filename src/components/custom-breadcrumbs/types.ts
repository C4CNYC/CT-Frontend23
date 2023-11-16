// @mui
import { BreadcrumbsProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface BreadcrumbsLinkProps {
  name?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactElement;
}

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  action?: React.ReactNode;
  links: BreadcrumbsLinkProps[];
}
