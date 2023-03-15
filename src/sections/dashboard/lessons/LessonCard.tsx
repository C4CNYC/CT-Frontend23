import ConfirmDialog from "@components/confirm-dialog";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import { useSnackbar } from "@components/snackbar";
import TextMaxLine from "@components/text-max-line";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Divider, IconButton, MenuItem, Stack } from "@mui/material";
import CreateLessonDialog from "@sections/dashboard/lessons/CreateLessonDialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { ILesson } from "src/redux/services/interfaces/courseUnits.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { useDeleteLessonMutation } from "../../../redux/services/manager/lessons-manager";
import CreateContentDialog from "./CreateContentDialog";
import LessonStepMain from "./LessonStep/LessonStepMain";

// ----------------------------------------------------------------------

interface Props {
  lesson: ILesson & BaseResponseInterface;
}

export default function LessonCard({
  lesson,
}: Props): React.ReactElement | null {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [deleteLesson] = useDeleteLessonMutation();

  const onDelete = async (): Promise<void> => {
    setLoading(true);
    if (lesson.id) {
      try {
        await deleteLesson({ id: lesson.id }).unwrap();
        enqueueSnackbar("lesson deleted!");
      } catch (e) {
        enqueueSnackbar(e.data.message, {
          variant: "error",
        });
      }
      setLoading(false);
    }
  };

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const openContentCreationTool = (): void => {
    router.push(
      `${router.pathname}?${new URLSearchParams({ lessonId: lesson.id })}`,
      undefined,
      { shallow: true }
    );
  };

  const closeContentCreationTool = (): void => {
    router.push(router.pathname, undefined, { shallow: true });
  };

  return (
    <>
      <Card
        onClick={openContentCreationTool}
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
      <LessonStepMain
        onClose={closeContentCreationTool}
        lessonName={lesson.name}
      />
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
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onDelete}
            loading={loading}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
