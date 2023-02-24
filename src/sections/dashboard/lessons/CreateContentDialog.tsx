import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useState } from "react";
import MyEditor from "@pages/components/editor/editor";

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
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Create Lesson Content</DialogTitle>
        <DialogContent sx={{ py: 10 }}>
          <MyEditor />
        </DialogContent>
      </Dialog>
    </>
  );
}
