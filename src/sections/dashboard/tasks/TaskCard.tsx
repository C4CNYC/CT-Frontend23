import { useState } from "react";

import { LoadingButton } from "@mui/lab";
import { Box, Card, IconButton, MenuItem, Stack } from "@mui/material";

import {
  ConfirmDialog,
  Iconify,
  MenuPopover,
  TextMaxLine,
  useSnackbar,
} from "@components";
import CreateCodeDialog from "@sections/dashboard/tasks/CodeDialog";
import { ITask } from "src/redux/services/interfaces/task.interface";
import { useDeleteTaskMutation } from "src/redux/services/manager/tasks-manager";

interface Props {
  task: ITask;
}

export default function TaskCard({ task }: Props): React.ReactElement | null {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const { enqueueSnackbar } = useSnackbar();

  const codeBody = JSON.parse(task.body);

  const onDelete = async (): Promise<void> => {
    setIsLoading(true);
    if (task.id) {
      try {
        await deleteTask({ id: task.id }).unwrap();
        enqueueSnackbar("Deleted succesfuly!");
      } catch (error: any) {
        enqueueSnackbar(error?.data?.message, {
          variant: "error",
        });
      }
    }
    setIsLoading(false);
  };

  const handleOpenPopover = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };
  return (
    <>
      <Card
        component="a"
        sx={{
          textDecoration: "none",
          p: 2.5,
          width: 1,
          boxShadow: 0,
          bgcolor: "background.default",
          maxWidth: "auto",
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          "&:hover": {
            bgcolor: "grey.100",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ top: 8, right: 8, position: "absolute" }}
        >
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
        <CreateCodeDialog
          taskId={task.id}
          taskName={task.name}
          isEdit
          code={codeBody.body.code}
          language={task.language}
        >
          <>
            <Box
              component="img"
              src="/assets/icons/files/ic_document.svg"
              sx={{ width: 40, height: 40 }}
            />
            <TextMaxLine variant="h6" sx={{ mt: 1, mb: 0.5 }}>
              {task.name}
            </TextMaxLine>

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.75}
              sx={{ typography: "caption", color: "text.disabled" }}
            >
              <Box
                sx={{
                  width: 2,
                  height: 2,
                  borderRadius: "50%",
                  bgColor: "currentColor",
                }}
              />
            </Stack>
          </>
        </CreateCodeDialog>
      </Card>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onDelete}
            loading={isLoading}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
