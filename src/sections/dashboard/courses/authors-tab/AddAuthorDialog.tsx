import { useState } from "react";
import { useFilters } from "@hooks";

import {
  Box,
  Dialog,
  Skeleton,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FilterAuthor } from "./filter";
import AuthorsCard from "./AuthorsCard";
import { useGetAuthorsQuery } from "src/redux/services/manager/author-manager";
import { IAuthorSearchParams } from "src/redux/services/interfaces/author.interface";

interface Props {
  children: React.ReactElement;
  courseId: string;
}

export default function AddAuthorDialog({
  children,
  courseId,
}: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const { filters, setFilter } = useFilters<IAuthorSearchParams>({
    email: "",
  });
  const { data, isLoading } = useGetAuthorsQuery(filters);
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
          <DialogTitle variant="h5">Add author</DialogTitle>
          <IconButton onClick={handleCloseDialog} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <FilterAuthor filters={filters} setFilter={setFilter} />
          {isLoading || !data ? (
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ height: "260px" }}
            />
          ) : (
            data.data.map((author, i) => {
              return (
                <AuthorsCard
                  key={author.id}
                  author={author}
                  courseId={courseId}
                  addAuthor={true}
                />
              );
            })
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
