import MyEditor from "@components/editor/MyEditor";
import { useSnackbar } from "@components/snackbar";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  CircularProgress,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { useState } from "react";
import { ILesson } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";
import { useUpdateLessonMutation } from "../../../redux/services/manager/lessons-manager";
import LessonInput from "./LessonInput";

interface Prop {
  children: React.ReactElement;
  lessonName: string;
  lessonId: string;
  lessonDescription: string;
}

export default function CreateContentDialog({
  children,
  lessonId,
  lessonName,
  lessonDescription,
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(lessonName);
  const [updateLesson] = useUpdateLessonMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetLessonContentQuery(
    { lessonId },
    { skip: !lessonId || !open }
  );

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    if (lessonName === updatedName) return;
    updateName(updatedName);
  };

  const updateName = async (value: string | number | null): Promise<void> => {
    try {
      await updateLesson({
        id: lessonId,
        ...{ name: value, description: lessonDescription },
      }).unwrap();
    } catch (e) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };
  return (
    <>
      <Stack
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Stack>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <AppBar color="inherit" sx={{ position: "relative", padding: 0 }}>
          <Toolbar sx={{ paddingLeft: 0, ml: 0 }} variant="dense">
            <LessonInput
              placeholder="Lesson name"
              defaultValue={lessonName}
              onBlur={(e: any) => setUpdatedName(e.target.value)}
            />
            <IconButton edge="end" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0, scrollbarWidth: "none" }}>
          {isLoading || !data ? (
            <Stack
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="450px"
            >
              <CircularProgress />
            </Stack>
          ) : (
            <MyEditor data={data} lessonId={lessonId} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
