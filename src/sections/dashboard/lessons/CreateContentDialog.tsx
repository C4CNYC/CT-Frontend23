import { AppBar, CircularProgress, Stack, Toolbar, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MyEditor from "@pages/components/editor/MyEditor";
import * as React from "react";
import { useState } from "react";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";

interface Prop {
  children: React.ReactElement;
  lessonName: string;
  lessonId: string;
}

export default function CreateContentDialog({
  children,
  lessonId,
  lessonName
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetLessonContentQuery({ lessonId }, { skip: !lessonId || !open });

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
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
            <Typography sx={{ ml: 0, flex: 1 }} variant="h6" component="div">
              {lessonName}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0, scrollbarWidth: "none" }}>
          {
            isLoading || !data
            ? (<Stack display="flex" justifyContent="center" alignItems="center" minHeight="450px"><CircularProgress/></Stack>)
            : (<MyEditor data={data} lessonId={lessonId} />)
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
