import ConfirmDialog from "@components/confirm-dialog";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import { useSnackbar } from "@components/snackbar";
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
import CreateLessonDialog from "@sections/dashboard/lessons/CreateLessonDialog";
import { useState } from "react";
import { ILessonCreate } from "../../../redux/services/interfaces/courseUnits.interface";
import { useDeleteLessonMutation } from "../../../redux/services/manager";

// ----------------------------------------------------------------------

interface Props extends ILessonCreate {
  lesson: {
    name: string;
    description: string;
    id?: string;
    type: string;
    active: boolean;
    key: any;
  };
}

export default function LessonCard({
  lesson,
}: Props): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [deleteLesson] = useDeleteLessonMutation();

  const onDelete = async (): Promise<void> => {
    if (lesson.id) {
      try {
        await deleteLesson({ id: lesson.id }).unwrap();
        enqueueSnackbar("lesson deleted!");
      } catch (e) {
        enqueueSnackbar(e.data.message, {
          variant: "error",
        });
      }
    }
  };

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <>
      <Card
        component="a"
        href="#"
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
          src="/assets/icons/files/ic_file.svg"
          sx={{ width: 40, height: 40 }}
        />

        <TextMaxLine variant="h6" sx={{ mt: 1, mb: 0.5 }}>
          {lesson.name}
        </TextMaxLine>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ typography: "caption", color: "text.disabled" }}
        >
          <Box>{lesson.description}</Box>
          <Box
            sx={{
              width: 2,
              height: 2,
              borderRadius: "50%",
              bgcolor: "currentColor",
            }}
          />
        </Stack>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <CreateLessonDialog
          isEdit
          id={lesson.id}
          defaultValues={{
            name: lesson.name,
            description: lesson.description,
            active: lesson.active,
            type: lesson.type,
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </CreateLessonDialog>

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
