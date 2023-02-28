import ConfirmDialog from "@components/confirm-dialog";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover/MenuPopover";
import TextMaxLine from "@components/text-max-line";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import CreateTaskDialog from "./CreateTaskDialog";

interface Props {
  task: {
    name: string;
    description: string;
    id?: string;
    type: string;
    active: boolean;
    key: any;
  };
}

export default function TaskCard({ task }: Props): React.ReactElement | null {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onDelete = async (): Promise<void> => {};

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
          <Box>{task.description}</Box>
          <Box
            sx={{
              width: 2,
              height: 2,
              borderRadius: "50%",
              bgColor: "currentColor",
            }}
          />
        </Stack>
      </Card>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 160 }}
      >
        <CreateTaskDialog
          isEdit
          id={task.id}
          defaultValues={{
            name: task.name,
            description: task?.description,
            active: task?.active,
            type: task?.type,
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </CreateTaskDialog>

        <Divider sx={{ borderStyle: "dashed" }} />

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
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
