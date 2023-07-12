import { CgBrowser } from "react-icons/cg";

import { Typography } from "@mui/material";

import { SupportedLang } from "../..";
import BaseBlock from "../BaseBlock";
import BrowserView from "./BrowserView";

const title = "Browser Preview";
const icon = <CgBrowser size="20px" color="#43D4DD" />;

interface IVueBlock {
  code: string;
  language: SupportedLang;
}

const ViewBlock = ({ code, language }: IVueBlock): React.ReactElement => {
  switch (language) {
    case "html": {
      return (
        <BaseBlock title={title} icon={icon} className="browserTour">
          <BrowserView value={code} />
        </BaseBlock>
      );
    }
    default: {
      return (
        <BaseBlock title={title} icon={icon}>
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
