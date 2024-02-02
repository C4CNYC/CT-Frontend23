import { LazyMotion, domAnimation, m } from "framer-motion";

import { Tooltip, Typography } from "@mui/material";

interface Props {
  text: string;
  open: boolean;
}

export const CheckersItemText = ({ text, open }: Props): React.ReactElement => {
  const listVariants = {
    open: {
      width: "100%",
      opacity: "1",
      padding: "6px 5px 0 8px",
      transition: {
        duration: 0.4,
      },
    },
    close: {
      width: "0px",
      opacity: "0",
      padding: 0,
      transition: {
        duration: 0.4,
      },
    },
  };
  return (
    <LazyMotion features={domAnimation}>
      <m.p
        animate={open ? "open" : "close"}
        initial={{ width: "0" }}
        variants={listVariants}
        style={{
          margin: "0",
          padding: "6px 5px 0 8px",
          width: "100%",
          opacity: "0",
          overflow: "hidden",
          color: "#333",
          height: "36px",
          whiteSpace: "nowrap",
        }}
      >
        <Tooltip placement="top" title={text}>
          <Typography noWrap maxWidth="350px" mr="26px">
            {text}
          </Typography>
        </Tooltip>
      </m.p>
    </LazyMotion>
  );
};
