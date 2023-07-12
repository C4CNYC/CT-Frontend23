import React from "react";

import { Box, Stack, Tooltip, Typography } from "@mui/material";

import HomeButton from "../HomeButton";

interface Props {
  fullWidth: boolean;
  name: string;
  lastName: string;
  title: string;
}

export default function ModalFooter({
  fullWidth,
  title,
  name,
  lastName,
}: Props): React.ReactElement {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: fullWidth ? "0" : "80px",
        width: fullWidth ? "100vw" : "500px",
        background: " #43D4DD",
        borderBottomLeftRadius: fullWidth ? "0" : "16px",
        borderBottomRightRadius: fullWidth ? "0" : "16px",
        px: fullWidth ? 4 : 1,
      }}
    >
      <Stack direction="row" sx={{ position: "relative", gap: 1 }}>
        <HomeButton />
        <Typography
          variant="subtitle2"
          sx={{ ml: "67px", color: "#EE467A" }}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#EE467A" }} gutterBottom>
          {lastName}
        </Typography>
      </Stack>
      <Tooltip
        title={
          title.length > 125 ? (
            <Typography variant="body2" sx={{ p: 1 }}>
              {title}
            </Typography>
          ) : (
            ""
          )
        }
      >
        <Typography
          variant="subtitle1"
          sx={{
            ml: "27px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box !important",
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
            whiteSpace: "normal",
            height: "45px",
            maxHeight: "45px",
          }}
          gutterBottom
        >
          {title}
        </Typography>
      </Tooltip>
    </Box>
  );
}
