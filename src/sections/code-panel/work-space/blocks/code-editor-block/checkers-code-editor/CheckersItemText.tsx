import { m } from "framer-motion";
import { useAtom } from "jotai";

import { Box, Tooltip, Typography } from "@mui/material";

import { checkersAnimationAtom } from "./checkers-animation-atom";

interface Props {
  text: string;
}

export default function CheckersItemText({ text }: Props): React.ReactElement {
  const [{ openText }] = useAtom(checkersAnimationAtom);
  const listVariants = {
    open: {
      width: "100%",
    },
    close: {
      width: "0px",
    },
  };
  return (
    <m.div
      animate={openText ? "open" : "close"}
      initial={{ width: "0" }}
      variants={listVariants}
      style={{
        margin: "0",
        width: "100%",
        overflow: "hidden",
        color: "#fff",
        whiteSpace: "nowrap",
      }}
    >
      <Tooltip
        placement="top"
        title={
          <Box sx={{ p: "8px" }}>
            <Typography sx={{ color: "#FBDD3F" }} variant="body1">
              {text}
            </Typography>
          </Box>
        }
      >
        <Typography noWrap maxWidth="350px" mr="26px">
          {text}
        </Typography>
      </Tooltip>
    </m.div>
  );
}
