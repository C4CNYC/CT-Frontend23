import React from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, alpha } from "@mui/material";

interface Props {
  setValue: (value: number) => void;
  value: number;
}

export function ArrowLeft({ setValue, value }: Props): React.ReactElement {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "45%",
        left: "0",
        width: "40px",
        height: "40px",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        background: alpha("#43D4DD", 0.3),
      }}
    >
      <IconButton
        onClick={() => {
          setValue(value ? 0 : 1);
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
    </Box>
  );
}

export function ArrowRight({ setValue, value }: Props): React.ReactElement {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "45%",
        right: "0",
        width: "40px",
        height: "40px",
        borderTopLeftRadius: "16px",
        borderBottomLeftRadius: "16px",
        background: alpha("#43D4DD", 0.3),
      }}
    >
      <IconButton
        onClick={() => {
          setValue(value ? 0 : 1);
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
