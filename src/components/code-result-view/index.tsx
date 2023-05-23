import { Typography } from "@mui/material";
import { ICodeContent } from "@sections/teacher-panel/code-panel/atoms/code.atom";
import { BrowserVariant } from "./variants/browser";

export const CodeResultView = ({ code, language }: ICodeContent): React.ReactElement => {
  switch (language) {
    case "html": {
      return (
          <BrowserVariant value={code} />
      );
    }
    default: {
      return (
          <Typography
            mt="40px"
            textAlign="center"
            textTransform="uppercase"
            color="#c4c4c4"
            variant="h6"
          >
            LANGUAGE NOT SUPORTED
          </Typography>
      );
    }
  }
};
