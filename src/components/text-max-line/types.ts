// @mui
import { LinkProps, TypographyProps } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

//

// ----------------------------------------------------------------------

type IProps = TypographyProps & LinkProps;

export interface TextMaxLineProps extends IProps {
  line?: number;
  asLink?: boolean;
  persistent?: boolean;
  children: React.ReactNode;
  variant?: Variant;
}
