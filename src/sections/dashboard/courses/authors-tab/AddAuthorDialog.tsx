import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import AuthorForm from "./AuthorForm";

interface Props {
  children: React.ReactElement;
  courseId: string;
}

export default function AddAuthorDialog({
  children,
  courseId,
}: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setOpen(true);
  };
  const handleCloseDialog = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "20%" }} onClick={handleOpenDialog}>
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            height: "800px",
            width: { xs: "360px", sm: "400px", md: "500px" },
          },
        }}
        sx={{}}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle variant="h5">Create author</DialogTitle>
          <IconButton onClick={handleCloseDialog} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <AuthorForm courseId={courseId} setFormVisible={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
