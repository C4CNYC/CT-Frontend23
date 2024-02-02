import { Typography } from "@mui/material";

import { ICodeContent } from "@sections/teacher-panel/code-panel/atoms/code.atom";

import BaseBlock from "../BaseBlock";
import BrowserView from "./BrowserView";

const ViewBlock = ({ code, language }: ICodeContent): React.ReactElement => {
  switch (language) {
    case "html": {
      return (
        <BaseBlock>
          <BrowserView value={code} />
        </BaseBlock>
      );
    }
    default: {
      return (
        <BaseBlock>
          <Typography
            mt="40px"
            textAlign="center"
            textTransform="uppercase"
            color="#c4c4c4"
            variant="h6"
          >
            LANGUAGE NOT SUPORTED
          </Typography>
        </BaseBlock>
      );
    }
  }
};

export default ViewBlock;
