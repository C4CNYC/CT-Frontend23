import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MyEditor from "@pages/components/editor/editor";
import * as React from "react";
import { useState } from "react";

interface Prop {
  children: React.ReactElement;
  lessonName: string;
  lessonId: string;
}

export default function CreateContentDialog({
  children,
  lessonId,
  lessonName
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
      <Stack
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Stack>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <AppBar color="inherit" sx={{ position: "relative", padding: 0 }}>
          <Toolbar sx={{ paddingLeft: 0, ml: 0 }} variant="dense">
            <Typography sx={{ ml: 0, flex: 1 }} variant="h6" component="div">
              {lessonName}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0, scrollbarWidth: "none" }}>
          <MyEditor />
        </DialogContent>
      </Dialog>
    </>
  );
}
