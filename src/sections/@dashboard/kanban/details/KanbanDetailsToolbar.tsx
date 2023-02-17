import { useState } from "react";
// @mui
import { Stack, Button, Tooltip, IconButton, Typography } from "@mui/material";
// hooks
import useResponsive from "../../../../hooks/useResponsive";
// components
import Iconify from "../../../../components/iconify";
import ConfirmDialog from "../../../../components/confirm-dialog";

// ----------------------------------------------------------------------

type Props = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  taskName: string;
  liked: boolean;
  completed: boolean;
  onLike: VoidFunction;
  onAttach: VoidFunction;
  onDelete: (task_id: string) => VoidFunction;
  onCompleted: VoidFunction;
  onCloseDetails: VoidFunction;
  task_id: string;
};

export default function KanbanDetailsToolbar({
  fileInputRef,
  taskName,
  liked,
  completed,
  onLike,
  onAttach,
  onDelete,
  onCompleted,
  onCloseDetails,
  task_id,
}: Props) {
  const isDesktop = useResponsive("up", "sm");

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Stack p={2.5} direction="row" alignItems="center">
        {!isDesktop && (
          <Tooltip title="Back">
            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Typography variant="h5">Details</Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          flexGrow={1}
        >
          <Tooltip title="Like this">
            <IconButton
              color={liked ? "default" : "primary"}
              size="small"
              onClick={onLike}
            >
              <Iconify icon="ic:round-thumb-up" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Attachment">
            <IconButton size="small" onClick={onAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete task">
            <IconButton onClick={handleOpenConfirm} size="small">
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>

          <IconButton size="small">
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <input ref={fileInputRef} type="file" style={{ display: "none" }} />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {taskName} </strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => onDelete(task_id)}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
