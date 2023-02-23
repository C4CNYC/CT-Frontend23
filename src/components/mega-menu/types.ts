// @mui
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

interface Products {
  name: string;
  image: string;
  path: string;
}

interface Tags {
  name: string;
  path: string;
}

export interface MenuCarouselProps {
  products: Products[];
  numberShow?: number;
  sx?: SxProps<Theme>;
}

export interface MenuHotProductsProps {
  tags: Tags[];
}

export interface ParentItemProps {
  title: string;
  path?: string;
  icon?: React.ReactElement;
  open?: boolean;
  hasSub?: boolean;
  onClick?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
  component?: React.ReactNode;
  to?: string;
}

export interface MegaMenuItemProps {
  title: string;
  path: string;
  icon: React.ReactElement;
  more?: {
    title: string;
    path: string;
  };
  products?: Products[];
  tags?: Tags[];
  children?: Array<{
    subheader: string;
    items: Array<{
      title: string;
      path: string;
    }>;
  }>;
}
