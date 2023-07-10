import { 
  useRef, 
  useState,
  useEffect, 
 } from "react";
import * as React from "react";

import { 
  Box, 
  Stack, 
  Button, 
  Typography,
  IconButton, 
 } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import { Iconify, ConfirmDialog } from "@components";
import Stepper from "./../createAssignment/Stepper";

interface Props {
  columnName: string;
  schoolId: string;
  onDelete: VoidFunction;
  onUpdate: (name: string) => void;
}

export default function AssignmentsColumnToolBar({
  columnName,
  onDelete,
  onUpdate,
  schoolId,
}: Props): React.ReactElement | null {
  const renameRef = useRef<HTMLInputElement>(null);

  const [value] = useState(columnName);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover] = useState<HTMLElement | null>(null);

  const [openAddTask, setOpenAddTask] = useState(false);

  useEffect(() => {
    const { current } = renameRef;

    if (openPopover) {
      if (current) {
        current.focus();
      }
    }
  }, [openPopover]);

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleToggleAddTask = (): void => {
    setOpenAddTask(!openAddTask);
  };

  const handleCloseStepper = (): void => {
    setOpenAddTask(false);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ pt: 3 }}
      >
        <Typography variant="h6">{value}</Typography>
        {columnName === "BACKLOG" && (
          <IconButton
            onClick={handleToggleAddTask}
            sx={{ fontSize: 14 }}
            color="primary"
          >
            <Iconify icon="eva:plus-fill" />
          </IconButton>
        )}
      </Stack>

      {openAddTask && (
        <Dialog
          open={openAddTask}
          onClose={() => {
            setOpenAddTask(false);
          }}
          PaperProps={{ sx: { padding: "20px" } }}
          fullWidth
        >
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Typography variant="h4">Create new assignment</Typography>
          </DialogTitle>
          <DialogContent sx={{ padding: "30px" }}>
            <Stepper schoolId={schoolId} closeStepper={handleCloseStepper} />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete column?
            <Box sx={{ typography: "caption", color: "error.main", mt: 2 }}>
              <strong> NOTE: </strong> All tasks related to this category will
              also be deleted.
            </Box>
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
