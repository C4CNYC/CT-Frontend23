import { type FC } from "react";

import { m } from "framer-motion";

import { Box, Tooltip, Typography } from "@mui/material";

import { useSelector } from "src/redux/store";

import { BOX_SX, LIST_VARIANTS, M_DIV_STYLE, TYPE_SX } from "./constants";

interface CheckersItemTextProps {
  text: string;
}

const CheckersItemText: FC<CheckersItemTextProps> = ({ text }) => {
  const isTextOpened = useSelector(
    (state) => state.checkersAnimation.isTextOpened
  );

  return (
    <m.div
      animate={"open"}
      initial={{ width: "0" }}
      variants={LIST_VARIANTS}
      style={M_DIV_STYLE}
    >
      <Tooltip
        placement="top"
        title={
          <Box sx={BOX_SX}>
            <Typography sx={TYPE_SX} variant="body1">
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
};

export default CheckersItemText;
