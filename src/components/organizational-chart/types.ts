import { TreeProps } from "react-organizational-chart";

// @mui
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

type VariantValue = "simple" | "standard" | "group";

export interface ItemProps {
  name: string;
  group?: string;
  role?: string | null;
  avatar?: string | null;
  children?: any;
}

export interface ListProps {
  data: ItemProps;
  depth: number;
  variant?: VariantValue;
  sx?: SxProps<Theme>;
}

export interface SubListProps {
  data: ItemProps[];
  depth: number;
  variant?: VariantValue;
  sx?: SxProps<Theme>;
}

export type OrganizationalChartProps = Partial<TreeProps> & {
  data: {
    name: string;
    children: ItemProps[];
  };
  variant?: VariantValue;
  sx?: SxProps<Theme>;
};
