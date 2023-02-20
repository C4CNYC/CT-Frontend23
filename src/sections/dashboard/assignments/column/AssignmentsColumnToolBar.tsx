import { useRef, useState, useEffect } from "react";
import {
  Stack,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Iconify from "@components/iconify";
import ConfirmDialog from "@components/confirm-dialog";
import Stepper from "./../createAssignment/Stepper";
import { useDispatch } from "../../../../redux/store";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { IAssignmentsCard } from "../../../../@types/assignments";

// ----------------------------------------------------------------------

type Props = {
  columnName: string;
  school_id: string;
  onDelete: VoidFunction;
  onUpdate: (name: string) => void;
};

export default function AssignmentsColumnToolBar({
  columnName,
  onDelete,
  onUpdate,
  school_id,
}: Props) {
  const dispatch = useDispatch();

  const renameRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(columnName);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [openAddTask, setOpenAddTask] = useState(false);

  useEffect(() => {
    const { current } = renameRef;

    if (openPopover) {
      if (current) {
        current.focus();
      }
    }
  }, [openPopover]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleClickRename = () => {
    handleClosePopover();
  };

  const handleChangeColumnName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const handleUpdateColumn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && renameRef.current) {
      renameRef.current.blur();
      onUpdate(value);
    }
  };

  const handleToggleAddTask = () => {
    setOpenAddTask(!openAddTask);
  };

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  const handleAddTask = (task: IAssignmentsCard) => {
    handleCloseAddTask();
    console.log("qwe");
  };

  const handleCloseStepper = () => {
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
          onClose={() => setOpenAddTask(false)}
          PaperProps={{ sx: { padding: "20px" } }}
          fullWidth
        >
          <DialogTitle sx={{ marginBottom: 2 }}>
            <Typography variant="h4">Create new assignment</Typography>
          </DialogTitle>
          <DialogContent sx={{ padding: "30px" }}>
            <Stepper school_id={school_id} closeStepper={handleCloseStepper} />
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
