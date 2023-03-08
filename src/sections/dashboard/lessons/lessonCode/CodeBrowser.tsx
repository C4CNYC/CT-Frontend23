import { Box } from "@mui/material";
import parse from "html-react-parser";

type Props = {
  code?: string;
};

export default function CodeBrowser({ code = "" }: Props): React.ReactElement {
  return <Box sx={{ height: "80vh" }}>{parse(code)}</Box>;
}
