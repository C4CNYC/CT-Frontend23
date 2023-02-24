import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useState } from "react";
import MyEditor from "@pages/components/editor/editor";
import { CloseIcon } from "yet-another-react-lightbox/core";

interface Prop {
  children: React.ReactElement;
}

export default function CreateContentDialog({
                                              children,
                                            }: Prop): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Box
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullScreen>
         <AppBar color="inherit" sx={{ position: "relative", padding: 0 }}>
          <Toolbar sx={{ padding: 0, m: 0 }} variant="dense">
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Lesson Content
            </Typography>
            <Button variant="contained" autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ ml: 3 }} variant="contained" autoFocus onClick={handleClose}>
              Publish
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0 }}>
          <MyEditor />
        </DialogContent>
      </Dialog>
    </>
  );
}
