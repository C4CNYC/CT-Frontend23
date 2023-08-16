import { useState } from "react";

import { useSnackbar } from "notistack";

import { LoadingButton } from "@mui/lab";
import { IconButton, Stack, Typography, alpha } from "@mui/material";

import { ConfirmDialog, Iconify } from "@components";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import { IGoals } from "src/redux/interfaces/goals.interface";
import { useRemoveGoalMutation } from "src/redux/services/manager/goals-student";

import AddEditNoteDialog from "./AddEditGoalDialog";

interface INotesItemProps {
  note: IGoals;
}
export default function NotesItem({ note }: INotesItemProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteNote, { isLoading }] = useRemoveGoalMutation();
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelete = async () => {
    try {
      await deleteNote({ id: note.id as string }).unwrap();
      enqueueSnackbar("Deleted!");
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
    handleCloseConfirm();
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 2,
          borderRadius: 4,
          border: `3px solid ${note.color}`,
          background: alpha(note.color, 0.5),
        }}
      >
        <Stack>
          <Typography sx={{ px: 3 }} variant="h6">
            {note.title}
          </Typography>

          <Typography sx={{ px: 3 }} variant="body1">
            {note.description}
          </Typography>
        </Stack>

        <Stack sx={{ flexDirection: { sm: "column", md: "row" }, gap: 1 }}>
          <AddEditNoteDialog note={note}>
            <IconButton
              sx={{
                background: "#fff",
                "&:hover": {
                  background: "#fff",
                },
              }}
            >
              <Iconify icon="eva:edit-fill" width="22px" />
            </IconButton>
          </AddEditNoteDialog>
          <IconButton
            sx={{
              color: "error.main",
              background: "#fff",
              "&:hover": {
                background: "#fff",
              },
            }}
            onClick={handleOpenConfirm}
          >
            <Iconify icon="eva:trash-2-outline" width="22px" />
          </IconButton>
        </Stack>
      </Stack>
      <ConfirmDialog
        onClose={handleCloseConfirm}
        open={openConfirm}
        title="Delete"
        content={
          <Typography> Are you sure you want to delete the goal?</Typography>
        }
        action={
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
