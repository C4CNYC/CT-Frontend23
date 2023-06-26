import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Options } from "react-markdown";

// ----------------------------------------------------------------------

export interface MarkdownProps extends Options {
  sx?: SxProps<Theme>;
}
