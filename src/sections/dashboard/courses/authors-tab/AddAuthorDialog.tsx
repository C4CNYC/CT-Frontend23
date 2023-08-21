import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";

import { IAuthor } from "src/redux/services/interfaces/author.interface";

import AuthorForm from "./AuthorForm";

interface IAddAuthorDialogProps {
  children: React.ReactElement;
  courseId: string;
  defaultValues?: IAuthor;
}

export default function AddAuthorDialog({
  children,
  courseId,
  defaultValues,
}: IAddAuthorDialogProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setOpen(true);
  };
  const handleCloseDialog = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }} onClick={handleOpenDialog}>
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            height: "800px",
            width: { xs: "330px", sm: "350px", md: "450px" },
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle variant="h5">Create author</DialogTitle>
          <IconButton onClick={handleCloseDialog} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <AuthorForm
          courseId={courseId}
          setFormVisible={handleCloseDialog}
          defaultValues={defaultValues}
          isEdit={Boolean(defaultValues)}
        />
      </Dialog>
    </>
  );
}
