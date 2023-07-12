import { useState } from "react";

import { javascript } from "@codemirror/lang-javascript";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import { RHFCode } from "../hook-form";
import { Iconify } from "../iconify";

interface Props {
  title: string;
  name: string;
}

export function ModalCodeFullscreen({
  title,
  name,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton
        onClick={handleOpen}
        sx={(theme) => ({
          color: theme.palette.primary.main,
          "&:hover": {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
          },
        })}
      >
        <Iconify icon="icons8:resize-four-directions" width="18px" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"xl"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          pr={2}
        >
          <DialogTitle>{title}</DialogTitle>
          <IconButton
            onClick={handleClose}
            sx={(theme) => ({
              color: theme.palette.primary.main,
              "&:hover": {
                color: theme.palette.primary.contrastText,
                background: theme.palette.primary.main,
              },
            })}
          >
            <Iconify icon="ps:resize" width="18px" />
          </IconButton>
        </Stack>
        <DialogContent>
          <Box sx={{ pb: 4, ml: -1 }}>
            <RHFCode
              placeholder=""
              name={name}
              height="75vh"
              extensions={[javascript({ jsx: true })]}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
