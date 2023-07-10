import { useState } from "react";

import { 
  Stack, 
  Button, 
  Tooltip, 
  IconButton, 
  Typography,
} from "@mui/material";

import { Iconify, ConfirmDialog } from "@components";

import { useResponsive } from "@hooks";

interface Props {
  fileInputRef: React.RefObject<HTMLInputElement>;
  taskName: string;
  onAttach: VoidFunction;
  onDelete: () => void;
  onCloseDetails: VoidFunction;
}

export default function AssignmentsDetailsToolbar({
  fileInputRef,
  taskName,
  onAttach,
  onDelete,
  onCloseDetails,
}: Props): React.ReactElement | null {
  const isDesktop = useResponsive("up", "sm");

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
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
          <Tooltip title="Attachment">
            <IconButton size="small" onClick={onAttach} disabled>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete task">
            <IconButton onClick={handleOpenConfirm} size="small">
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>

          <IconButton size="small" disabled>
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
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
