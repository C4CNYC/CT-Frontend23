import MyEditor from "@components/editor/MyEditor";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { useEffect, useState } from "react";
import { LessonContentType } from "src/redux/services/enums/lesson-content-type.enum";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";
import { useUpdateLessonMutation } from "src/redux/services/manager/lessons-manager";
import CodeMain from "./lessonCode/CodeMain";
import LessonInput from "./LessonInput";
import LessonSelect from "./LessonSelect";

interface Prop {
  children: React.ReactElement;
  lessonName: string;
  lessonId: string;
  lessonDescr: string;
}

export default function CreateContentDialog({
  children,
  lessonId,
  lessonName,
  lessonDescr,
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(lessonName);
  const [contentType, setContentType] = useState<LessonContentType>();

  const [updateLesson] = useUpdateLessonMutation();

  const { data, isLoading } = useGetLessonContentQuery(
    { lessonId },
    { skip: !lessonId || !open }
  );
  useEffect(() => {
    if (!data) return;
    setContentType(data?.type as LessonContentType);
  }, [data]);
  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    if (lessonName == updatedName) return;
    updateLessonName();
  };

  const updateLessonName = async () => {
    await updateLesson({
      id: lessonId,
      ...{ name: updatedName, description: lessonDescr },
    });
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
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xl"
        sx={{ "& .MuiDialog-paper": { minHeight: "93vh" } }}
      >
        <AppBar color="inherit" sx={{ position: "relative", padding: 0 }}>
          <Toolbar sx={{ paddingLeft: 0, ml: 0 }} variant="dense">
            <LessonInput
              placeholder="Lesson name"
              defaultValue={lessonName}
              onBlur={(e) => setUpdatedName(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {contentType ? (
                <LessonSelect
                  setOptions={setContentType}
                  contentType={contentType}
                />
              ) : null}

              <IconButton edge="end" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
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
          ) : contentType === LessonContentType.Editable ? (
            <MyEditor data={data} lessonId={lessonId} />
          ) : (
            <CodeMain data={data} lessonId={lessonId} isLoading={isLoading} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
