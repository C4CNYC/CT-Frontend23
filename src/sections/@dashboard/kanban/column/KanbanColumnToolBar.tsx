import { useRef, useState, useEffect } from "react";
// @mui
import {
  Stack,
  MenuItem,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
// components
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";
import ConfirmDialog from "../../../../components/confirm-dialog";
//
import KanbanInputName from "../KanbanInputName";
import KanbanTaskAdd from "../KanbanTaskAdd";
import { IKanbanCard } from "../../../../@types/kanban";
import { addTask } from "../../../../redux/slices/kanban";
import { useDispatch } from "../../../../redux/store";

// ----------------------------------------------------------------------

type Props = {
  columnName: string;
  onDelete: VoidFunction;
  onUpdate: (name: string) => void;
};

export default function KanbanColumnToolBar({
  columnName,
  onDelete,
  onUpdate,
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

  const handleAddTask = (task: IKanbanCard) => {
    handleCloseAddTask();
    console.log("qwe");
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
        <IconButton onClick={handleToggleAddTask} sx={{ fontSize: 14 }}>
          <Iconify icon="eva:plus-fill" />
        </IconButton>
      </Stack>

      {openAddTask && (
        <KanbanTaskAdd
          onAddTask={handleAddTask}
          onCloseAddTask={handleCloseAddTask}
        />
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
